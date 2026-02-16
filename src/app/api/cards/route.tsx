
// import { NextResponse } from "next/server";
// import { Types } from "mongoose";
// import Card from "@/db/models/Card";
// import { connectDB } from "@/db/db";

// const DEFAULT_LIMIT = 20;
// const MAX_LIMIT = 50;

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const q = searchParams.get("q"); // 🔍 поиск по имени
//     const set = searchParams.get("set");
//     const rarity = searchParams.get("rarity");
//     const cursor = searchParams.get("cursor");
//     const limitRaw = searchParams.get("limit");

//     const limit = Math.min(
//       Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1),
//       MAX_LIMIT
//     );

//     /* ============================
//       ФОРМИРОВАНИЕ ФИЛЬТРА
//     ============================ */

//     const filters: Record<string, unknown> = {};

//     if (q) {
//       filters.name = {
//         $regex: `^${q}`,
//         $options: "i",
//       };
//     }

//     if (set) {
//       filters.set = set;
//     }

//     if (rarity) {
//       filters.rarity = rarity;
//     }

//     if (cursor) {
//       filters._id = { $lt: new Types.ObjectId(cursor) };
//     }

//     /* ============================ */

//     const docs = await Card.find(filters)
//       .sort({ _id: -1 })
//       .limit(limit + 1)
//       .lean();

//     const hasMore = docs.length > limit;
//     const items = hasMore ? docs.slice(0, limit) : docs;

//     const nextCursor = hasMore
//       ? String(items[items.length - 1]._id)
//       : null;

//     return NextResponse.json(
//       { items, nextCursor },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("❌ Ошибка в /api/cards:", err);
//     return NextResponse.json(
//       { items: [], nextCursor: null },
//       { status: 500 }
//     );
//   }
// }



// // =========================================
// import { NextResponse } from "next/server";
// import mongoose, { Types } from "mongoose";
// import Card from "@/db/models/Card";
// import { connectDB } from "@/db/db";

// const DEFAULT_LIMIT = 20;
// const MAX_LIMIT = 50;

// const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// export async function GET(req: Request) {
//   // console.log("API /cards called");
//   try {
//     await connectDB();

//     console.log("DB state:", mongoose.connection.readyState);




//     const { searchParams } = new URL(req.url);

//     const qRaw = searchParams.get("q");

//     // const set = searchParams.get("set");
//     // const setsRaw = searchParams.get("sets"); // "mh3,war"
//     const setsRawAll = searchParams.getAll("sets"); // ["TLA", "TLE"] или []
//     const setsRaw = setsRawAll.length
//   ? setsRawAll.join(",")
//   : searchParams.get("sets");

//     const rarity = searchParams.get("rarity");

//     const cursor = searchParams.get("cursor"); // для load more
//     const pageRaw = searchParams.get("page");  // для страниц
//     const limitRaw = searchParams.get("limit");

//     const limit = Math.min(
//       Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1),
//       MAX_LIMIT
//     );

//     const page = pageRaw ? Math.max(Number(pageRaw) || 1, 1) : null;

//     // ✅ фильтры без any
//     const filters: Record<string, unknown> = {};

//     if (qRaw && qRaw.trim()) {
//       const q = escapeRegex(qRaw.trim());
//       filters.name = { $regex: `^${q}`, $options: "i" };
//     }
    
//     // if (set) filters.set = set;
//     if (setsRaw) {
//       const sets = setsRaw
//         .split(",")
//         // .map((s) => s.trim())
//         .map(s => s.trim().toLowerCase())
//         .filter(Boolean);
    
//       if (sets.length) {
//         filters.set = { $in: sets };
//       }
//     }

//     if (rarity) filters.rarity = rarity;

//     // ======================
//     // A) PAGE-режим (страницы)
//     // ======================
//     if (page) {
//       const skip = (page - 1) * limit;

//       const [items, total] = await Promise.all([
//         Card.find(filters).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
//         Card.countDocuments(filters),
//       ]);

//       const totalPages = Math.max(Math.ceil(total / limit), 1);

//       return NextResponse.json(
//         { mode: "pages", items, page, total, totalPages, limit, nextCursor: null },
//         { status: 200 }
//       );
//     }

//     // =========================
//     // B) CURSOR-режим (Load more)
//     // =========================
//     const cursorFilter = cursor
//       ? { ...filters, _id: { $lt: new Types.ObjectId(cursor) } }
//       : filters;

//     const docs = await Card.find(cursorFilter)
//       .sort({ _id: -1 })
//       .limit(limit + 1)
//       .lean();

//     const hasMore = docs.length > limit;
//     const items = hasMore ? docs.slice(0, limit) : docs;
//     const nextCursor = hasMore ? String(items[items.length - 1]._id) : null;

//     return NextResponse.json(
//       { mode: "more", items, nextCursor, limit },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("❌ Ошибка в /api/cards:", err);
//     return NextResponse.json(
//       { mode: "more", items: [], nextCursor: null, limit: DEFAULT_LIMIT },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
// import mongoose from "mongoose";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";

import type { PipelineStage } from "mongoose";

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
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (sets.length) {
        filters.set = { $in: sets };
      }
    }

    if (rarity) {
      filters.rarity = rarity;
    }

    /**
     * 🔥 ГРУППИРОВКА НА СЕРВЕРЕ
     *
     * 1. Фильтрация
     * 2. Сортировка (сначала NM > LP > HP)
     * 3. Группировка по scryfall_id + isFoil
     * 4. Берём первый (лучший condition)
     * 5. Пагинация уже по сгруппированным данным
     */

    const pipeline: PipelineStage[] = [ 
      { $match: filters },

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
        },
      },

      { $sort: { conditionRank: -1 } },

      {
        $group: {
          _id: {
            scryfall_id: "$scryfall_id",
            isFoil: "$isFoil",
          },
          doc: { $first: "$$ROOT" },
        },
      },

      { $replaceRoot: { newRoot: "$doc" } },

      { $sort: { name: 1, isFoil: 1 } },

      {
        $facet: {
          items: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const result = await Card.aggregate(pipeline);

    const items = result[0]?.items ?? [];
    const total = result[0]?.totalCount[0]?.count ?? 0;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return NextResponse.json(
      {
        items,
        page,
        total,
        totalPages,
        limit,
      },
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