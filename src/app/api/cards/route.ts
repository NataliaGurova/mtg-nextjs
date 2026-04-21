// src/app/api/cards/route.ts

import { NextResponse } from "next/server";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";
import type { PipelineStage } from "mongoose";
import { DbCard, Face } from "@/types/types";


// 🔹 Заставляем Next.js всегда генерировать свежие данные при запросе к этому API
export const dynamic = 'force-dynamic';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const escapeRegex = (s: string) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const qRaw = searchParams.get("q");
    const setsRawAll = searchParams.getAll("sets");
    const setsRaw = setsRawAll.length
      ? setsRawAll.join(",")
      : searchParams.get("sets");
    const rarity = searchParams.get("rarity");
    const pageRaw = searchParams.get("page");
    const limitRaw = searchParams.get("limit");
    const isFoilRaw = searchParams.get("isFoil");
    const colorsRaw = searchParams.get("colors");

    const limit = Math.min(
      Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1),
      MAX_LIMIT
    );

    const page = Math.max(Number(pageRaw) || 1, 1);
    const skip = (page - 1) * limit;

    const filters: Record<string, unknown> = {};

    if (qRaw?.trim()) {
      const q = escapeRegex(qRaw.trim());
      filters.name = { $regex: `^${q}`, $options: "i" };
    }

    if (setsRaw) {
      const sets = setsRaw
        .split(",")
        .map((s) => s.trim()) // убрали toLowerCase(), так как регулярка сама всё найдет
        .filter(Boolean);

      if (sets.length) {
        // 🔹 ИСПРАВЛЕНИЕ: Используем регулярное выражение с флагом "i" (ignore case)
        // Теперь база найдет и "pip", и "PIP", и "pIp"
        filters.set = { $in: sets.map((s) => new RegExp(`^${s}$`, "i")) };
      }
    }

    // if (setsRaw) {
    //   const sets = setsRaw
    //     .split(",")
    //     .map((s) => s.trim().toLowerCase())
    //     .filter(Boolean);

    //   if (sets.length) filters.set = { $in: sets };
    // }

    if (rarity) filters.rarity = rarity;

    if (isFoilRaw === "true") {
      filters.isFoil = true;
    } else if (isFoilRaw === "false") {
      // // Ищем те, где isFoil = false, ИЛИ где этого поля вообще нет
      // filters.isFoil = { $ne: true };
      filters.isFoil = false;
    }

    // 🔹 ЛОГИКА ДЛЯ ЦВЕТОВ (Упрощенная, так как "Colorless" — это строка в базе
    if (colorsRaw) {
      // 1. Разбиваем строку из URL на массив: "W,Colorless" -> ["W", "Colorless"]
      const selectedColors = colorsRaw.split(",").map((c) => c.trim()).filter(Boolean);

      // 2. Если массив не пустой, просто отдаем его базе
      if (selectedColors.length > 0) {
        // $in найдет карты, у которых в массиве colors есть хотя бы один из выбранных
        filters.colors = { $in: selectedColors };
      }
    }

    const pipeline: PipelineStage[] = [
      { $match: filters },

      // 1. Вычисляем ранг состояния и считаем АКТИВНЫЕ резервы
      {
        $addFields: {
          conditionRank: {
            $switch: {
              branches: [
                { case: { $eq: ["$condition", "NM"] }, then: 3 },
                { case: { $eq: ["$condition", "LP"] }, then: 2 },
                { case: { $eq: ["$condition", "HP"] }, then: 1 },
              ],
              default: 0,
            },
          },
          // 🔹 Считаем сумму qty только для тех резервов, у которых expiresAt > NOW
          activeReservedQty: {
            $reduce: {
              input: {
                $filter: {
                  input: { $ifNull: ["$reservations", []] }, // Если массива нет, берем пустой
                  as: "res",
                  cond: { $gt: ["$$res.expiresAt", new Date()] }, // Оставляем только свежие
                },
              },
              initialValue: 0,
              in: { $add: ["$$value", "$$this.qty"] }, // Суммируем их qty
            },
          },
        },
      },

      // 2. Вычисляем реальный доступный остаток (quantity - activeReservedQty)
      {
        $addFields: {
          availableQty: {
            $subtract: ["$quantity", "$activeReservedQty"],
          },
        },
      },

      { $sort: { scryfall_id: 1, isFoil: 1, conditionRank: -1, _id: 1 } },

      {
        $group: {
          _id: { scryfall_id: "$scryfall_id", isFoil: "$isFoil" },
          doc: { $first: "$$ROOT" },
        },
      },

      { $replaceRoot: { newRoot: "$doc" } },

      { $sort: { name: 1, isFoil: 1, _id: 1 } },

      {
        $facet: {
          items: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await Card.aggregate(pipeline);
    
    // 3. Форматируем результат для фронтенда
    const items = (result[0]?.items ?? []).map((doc: DbCard & { availableQty?: number }) => ({
      ...doc,
      _id: doc._id.toString(),
      set: doc.set?.toString(),
      // 🔹 Прокидываем вычисленный остаток на клиент
      availableQty: Math.max(0, doc.availableQty || 0), // Защита от отрицательных чисел
      
      faces: doc.faces?.map((face: Face) => ({
        side: face.side?.toString?.(),
        images: {
          small: face.images?.small?.toString?.(),
          normal: face.images?.normal?.toString?.(),
        },
      })),
    }));

    const total = result[0]?.totalCount[0]?.count ?? 0;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return NextResponse.json(
      { items, page, total, totalPages, limit },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ /api/cards error:", error);

    return NextResponse.json(
      {
        items: [],
        page: 1,
        total: 0,
        totalPages: 1,
        limit: DEFAULT_LIMIT,
      },
      { status: 500 }
    );
  }
}