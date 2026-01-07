
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


import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req: Request) {
  console.log("API /cards called");
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const qRaw = searchParams.get("q");

    // const set = searchParams.get("set");
    const setsRaw = searchParams.get("sets"); // "mh3,war"

    const rarity = searchParams.get("rarity");

    const cursor = searchParams.get("cursor"); // для load more
    const pageRaw = searchParams.get("page");  // для страниц
    const limitRaw = searchParams.get("limit");

    const limit = Math.min(
      Math.max(Number(limitRaw) || DEFAULT_LIMIT, 1),
      MAX_LIMIT
    );

    const page = pageRaw ? Math.max(Number(pageRaw) || 1, 1) : null;

    // ✅ фильтры без any
    const filters: Record<string, unknown> = {};

    if (qRaw && qRaw.trim()) {
      const q = escapeRegex(qRaw.trim());
      filters.name = { $regex: `^${q}`, $options: "i" };
    }
    
    // if (set) filters.set = set;
    if (setsRaw) {
      const sets = setsRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    
      if (sets.length) {
        filters.set = { $in: sets };
      }
    }

    if (rarity) filters.rarity = rarity;

    // ======================
    // A) PAGE-режим (страницы)
    // ======================
    if (page) {
      const skip = (page - 1) * limit;

      const [items, total] = await Promise.all([
        Card.find(filters).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
        Card.countDocuments(filters),
      ]);

      const totalPages = Math.max(Math.ceil(total / limit), 1);

      return NextResponse.json(
        { mode: "pages", items, page, total, totalPages, limit, nextCursor: null },
        { status: 200 }
      );
    }

    // =========================
    // B) CURSOR-режим (Load more)
    // =========================
    const cursorFilter = cursor
      ? { ...filters, _id: { $lt: new Types.ObjectId(cursor) } }
      : filters;

    const docs = await Card.find(cursorFilter)
      .sort({ _id: -1 })
      .limit(limit + 1)
      .lean();

    const hasMore = docs.length > limit;
    const items = hasMore ? docs.slice(0, limit) : docs;
    const nextCursor = hasMore ? String(items[items.length - 1]._id) : null;

    return NextResponse.json(
      { mode: "more", items, nextCursor, limit },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Ошибка в /api/cards:", err);
    return NextResponse.json(
      { mode: "more", items: [], nextCursor: null, limit: DEFAULT_LIMIT },
      { status: 500 }
    );
  }
}
