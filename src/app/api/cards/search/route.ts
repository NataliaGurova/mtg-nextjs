// // app/api/cards/search/route.ts

// import { NextResponse } from "next/server";
// import Card from "@/db/models/Card";
// import { connectDB } from "@/db/db";
// import type { PipelineStage } from "mongoose";

// const escapeRegex = (s: string) =>
//   s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);
//     const qRaw = searchParams.get("q")?.trim() || "";

//     if (qRaw.length < 3) {
//       return NextResponse.json([], { status: 200 });
//     }

//     const q = escapeRegex(qRaw);

//     const pipeline: PipelineStage[] = [
//       {
//         $match: {
//           name: { $regex: `^${q}`, $options: "i" }, // поиск с начала имени
//         },
//       },

//       // сортируем заранее чтобы $first брал предсказуемый документ
//       { $sort: { name: 1 } },

//       // убираем дубликаты вариаций
//       // {
//       //   $group: {
//       //     _id: {
//       //       scryfall_id: "$scryfall_id",
//       //       set_name: "$set_name",
//       //       collector_number: "$collector_number",
//       //     },
//       //     _idDoc: { $first: "$_id" },
//       //     name: { $first: "$name" },
//       //     set_name: { $first: "$set_name" },
//       //     collector_number: { $first: "$collector_number" },
//       //     scryfall_id: { $first: "$scryfall_id" },
//       //   },
//       // },
//       {
//         $group: {
//           _id: {
//             scryfall_id: "$scryfall_id",
//             set_name: "$set_name",
//             collector_number: "$collector_number",
//           },
//           _idDoc: { $first: "$_id" },
//           name: { $first: "$name" },
//           set_name: { $first: "$set_name" },
//           collector_number: { $first: "$collector_number" },
//           scryfall_id: { $first: "$scryfall_id" },
      
//           // 👇 берём front image
//           imageUrl: {
//             $first: {
//               $let: {
//                 vars: {
//                   frontFace: {
//                     $arrayElemAt: [
//                       {
//                         $filter: {
//                           input: "$faces",
//                           as: "face",
//                           cond: { $eq: ["$$face.side", "front"] },
//                         },
//                       },
//                       0,
//                     ],
//                   },
//                 },
//                 in: "$$frontFace.imageUrl",
//               },
//             },
//           },
//         },
//       },

//       {
//         $project: {
//           _id: "$_idDoc",
//           name: 1,
//           set_name: 1,
//           collector_number: 1,
//           scryfall_id: 1,
//           imageUrl: 1,
//         },
//       },

//       { $limit: 10 },
//     ];

//     const cards = await Card.aggregate(pipeline);

//     return NextResponse.json(cards, { status: 200 });
//   } catch (error) {
//     console.error("❌ /api/cards/search error:", error);
//     return NextResponse.json([], { status: 500 });
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
          name: { $regex: `^${q}`, $options: "i" },
        },
      },

      { $sort: { name: 1 } },

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

          // берём front face image
          image: {
            $first: {
              $let: {
                vars: {
                  frontFace: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$faces",
                          as: "face",
                          cond: { $eq: ["$$face.side", "front"] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: "$$frontFace.images.small",
              },
            },
          },
        },
      },

      {
        $project: {
          _id: "$_idDoc",
          name: 1,
          set_name: 1,
          collector_number: 1,
          scryfall_id: 1,
          image: 1,
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