// import { NextResponse } from "next/server";
// import { connectDB } from "@/db/db";
// import Card from "@/db/models/Card";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const q = searchParams.get("q");

//   if (!q || q.length < 3) {
//     return NextResponse.json([]);
//   }

//   await connectDB();

//   const cards = await Card.find(
//     {
//       name: { $regex: `^${q}`, $options: "i" }, // начинается с этих букв
//     },
//     { name: 1, _id: 1 }
//   )
//     .limit(8)
//     .lean();

//   return NextResponse.json(cards);
// }

// app/api/cards/suggest/route.ts

// import { NextResponse } from "next/server";
// import { connectDB } from "@/db/db";
// import Card from "@/db/models/Card";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const q = searchParams.get("q");

//   if (!q || q.length < 3) {
//     return NextResponse.json([]);
//   }

//   await connectDB();

//   const cards = await Card.aggregate([
//     {
//       $match: {
//         name: { $regex: `^${q}`, $options: "i" },
//       },
//     },
//     {
//       $group: {
//         _id: "$scryfall_id", // 🔥 группируем варианты
//         name: { $first: "$name" },
//         scryfall_id: { $first: "$scryfall_id" },
//       },
//     },
//     { $limit: 8 },
//   ]);

//   return NextResponse.json(cards);
// }



// ===========================
// // app/api/cards/search/route.ts
// import { NextResponse } from "next/server";
// import Card from "@/db/models/Card";
// import { connectDB } from "@/db/db";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const q = searchParams.get("q")?.trim() || "";

//   if (q.length < 3) return NextResponse.json([], { status: 200 });

//   try {
//     await connectDB();

//     const regex = new RegExp(q, "i");

//     const cards = await Card.find(
//       { name: regex },
//       { _id: 1, name: 1, set_name: 1, collector_number: 1, scryfall_id: 1 }
//     )
//       .limit(10)
//       .lean();

//     return NextResponse.json(cards);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }



// app/api/cards/search/route.ts

import { NextResponse } from "next/server";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";
import type { PipelineStage } from "mongoose";

const escapeRegex = (s: string) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const qRaw = searchParams.get("q")?.trim() || "";

    if (qRaw.length < 3) {
      return NextResponse.json([], { status: 200 });
    }

    const q = escapeRegex(qRaw);

    const pipeline: PipelineStage[] = [
      {
        $match: {
          name: { $regex: `^${q}`, $options: "i" }, // поиск с начала имени
        },
      },

      // сортируем заранее чтобы $first брал предсказуемый документ
      { $sort: { name: 1 } },

      // убираем дубликаты вариаций
      {
        $group: {
          _id: {
            scryfall_id: "$scryfall_id",
            set_name: "$set_name",
            collector_number: "$collector_number",
          },
          _idDoc: { $first: "$_id" },
          name: { $first: "$name" },
          set_name: { $first: "$set_name" },
          collector_number: { $first: "$collector_number" },
          scryfall_id: { $first: "$scryfall_id" },
        },
      },

      {
        $project: {
          _id: "$_idDoc",
          name: 1,
          set_name: 1,
          collector_number: 1,
          scryfall_id: 1,
        },
      },

      { $limit: 10 },
    ];

    const cards = await Card.aggregate(pipeline);

    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error("❌ /api/cards/search error:", error);
    return NextResponse.json([], { status: 500 });
  }
}