
import { NextResponse } from "next/server";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";
import type { PipelineStage } from "mongoose";
import { DbCard, Face } from "@/types/types";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

    const limit = Math.min(Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1), MAX_LIMIT);
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
      if (sets.length) filters.set = { $in: sets };
    }

    if (rarity) filters.rarity = rarity;

    // =========================================
    const pipeline: PipelineStage[] = [
      { $match: filters },

      // ранжирование по condition
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

      // сортировка перед группировкой
      { $sort: { scryfall_id: 1, isFoil: 1, conditionRank: -1, _id: 1 } },

      // группировка по scryfall_id + isFoil
      {
        $group: {
          _id: { scryfall_id: "$scryfall_id", isFoil: "$isFoil" },
          doc: { $first: "$$ROOT" },
        },
      },

      // возвращаем оригинальный документ
      { $replaceRoot: { newRoot: "$doc" } },

      // финальная сортировка
      { $sort: { name: 1, isFoil: 1, _id: 1 } },

      // фасет для пагинации
      { $facet: { items: [{ $skip: skip }, { $limit: limit }], totalCount: [{ $count: "count" }] } },
    ];

    const result = await Card.aggregate(pipeline);

    // ⚡ приводим все документы к plain objects и сериализуем _id
    const items = (result[0]?.items ?? []).map((doc: DbCard) => ({
      ...doc,
      _id: doc._id.toString(),
      set: doc.set?.toString(),
      // imageUrl и остальные поля оставляем как строки или простые объекты
      faces: doc.faces?.map((face: Face) => ({
        // ...face,
        side: face.side?.toString?.(),
        imageUrl: face.imageUrl?.toString(),
        // любые другие вложенные поля тоже конвертируем в строки/простые значения
      })),
    }));

    const total = result[0]?.totalCount[0]?.count ?? 0;
    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return NextResponse.json({ items, page, total, totalPages, limit }, { status: 200 });
  } catch (error) {
    console.error("❌ /api/cards error:", error);
    return NextResponse.json({ items: [], page: 1, total: 0, totalPages: 1, limit: DEFAULT_LIMIT }, { status: 500 });
  }
}


// =========================================

// import { NextResponse } from "next/server";
// import Card from "@/db/models/Card";
// import { connectDB } from "@/db/db";

// import type { PipelineStage } from "mongoose";
// import { Color, DbCard, Face } from "@/types/types";

// const DEFAULT_LIMIT = 20;
// const MAX_LIMIT = 50;

// const escapeRegex = (s: string) =>
//   s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     const qRaw = searchParams.get("q");
//     const setsRawAll = searchParams.getAll("sets");
//     const setsRaw =
//       setsRawAll.length > 0
//         ? setsRawAll.join(",")
//         : searchParams.get("sets");

//     const rarity = searchParams.get("rarity");
//     const pageRaw = searchParams.get("page");
//     const limitRaw = searchParams.get("limit");
//     const colorsRaw = searchParams.get("colors");

//     const limit = Math.min(
//       Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1),
//       MAX_LIMIT
//     );

//     const page = Math.max(Number(pageRaw) || 1, 1);
//     const skip = (page - 1) * limit;

//     /* ===================== FILTERS ===================== */

//     const filters: Record<string, unknown> = {};

//     // 🔎 Name search
//     if (qRaw?.trim()) {
//       const q = escapeRegex(qRaw.trim());
//       filters.name = { $regex: `^${q}`, $options: "i" };
//     }

//     // 🧩 Sets
//     if (setsRaw) {
//       const sets = setsRaw
//         .split(",")
//         .map((s) => s.trim().toLowerCase())
//         .filter(Boolean);

//       if (sets.length) {
//         filters.set = { $in: sets };
//       }
//     }

//     // 💎 Rarity
//     if (rarity) {
//       filters.rarity = rarity;
//     }

//     // 🎨 Colors
//     if (colorsRaw) {
//       const colorArray = colorsRaw
//         .split(",")
//         .map((c) => c.trim())
//         .filter(Boolean) as Color[];

//       if (colorArray.length) {
//         filters.colors = { $in: colorArray };
//       }
//     }

//     /* ===================== PIPELINE ===================== */

//     const pipeline: PipelineStage[] = [];

//     // 1️⃣ MATCH
//     if (Object.keys(filters).length > 0) {
//       pipeline.push({ $match: filters });
//     }

//     // 2️⃣ Condition ranking
//     pipeline.push({
//       $addFields: {
//         conditionRank: {
//           $switch: {
//             branches: [
//               { case: { $eq: ["$condition", "NM"] }, then: 3 },
//               { case: { $eq: ["$condition", "LP"] }, then: 2 },
//               { case: { $eq: ["$condition", "HP"] }, then: 1 },
//             ],
//             default: 0,
//           },
//         },
//       },
//     });

//     // 3️⃣ Sort before grouping
//     pipeline.push({
//       $sort: {
//         scryfall_id: 1,
//         isFoil: 1,
//         conditionRank: -1,
//         _id: 1,
//       },
//     });

//     // 4️⃣ Group
//     pipeline.push({
//       $group: {
//         _id: { scryfall_id: "$scryfall_id", isFoil: "$isFoil" },
//         doc: { $first: "$$ROOT" },
//       },
//     });

//     // 5️⃣ Restore document
//     pipeline.push({ $replaceRoot: { newRoot: "$doc" } });

//     // 6️⃣ Final sort
//     pipeline.push({
//       $sort: {
//         name: 1,
//         isFoil: 1,
//         _id: 1,
//       },
//     });

//     // 7️⃣ Pagination
//     pipeline.push({
//       $facet: {
//         items: [{ $skip: skip }, { $limit: limit }],
//         totalCount: [{ $count: "count" }],
//       },
//     });

//     /* ===================== EXECUTE ===================== */

//     const result = await Card.aggregate(pipeline);

//     const items: DbCard[] = (result[0]?.items ?? []).map(
//       (doc: DbCard) => ({
//         ...doc,
//         _id: doc._id.toString(),
//         set: doc.set?.toString(),
//         faces: doc.faces?.map((face: Face) => ({
//           side: face.side?.toString?.(),
//           imageUrl: face.imageUrl?.toString?.(),
//         })),
//       })
//     );

//     const total = result[0]?.totalCount[0]?.count ?? 0;
//     const totalPages = Math.max(Math.ceil(total / limit), 1);

//     return NextResponse.json(
//       {
//         items,
//         page,
//         total,
//         totalPages,
//         limit,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ /api/cards error:", error);

//     return NextResponse.json(
//       {
//         items: [],
//         page: 1,
//         total: 0,
//         totalPages: 1,
//         limit: DEFAULT_LIMIT,
//       },
//       { status: 500 }
//     );
//   }
// }
