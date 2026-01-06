
import { connectDB } from "@/db/db";
import Card from "@/db/models/Card";
import { NextResponse } from "next/server";


type SetAggRow = {
  set: string;      // set code (например "mh3")
  set_name: string; // "Modern Horizons 3"
  count: number;
};

type ScryfallSet = {
  code: string;
  icon_svg_uri?: string;
};

type SetSummary = SetAggRow & {
  iconSvgUrl: string | null;
};

let cachedScryfallMap: Map<string, string> | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 час

async function getScryfallIconMap(): Promise<Map<string, string>> {
  const now = Date.now();
  if (cachedScryfallMap && now - cachedAt < CACHE_TTL_MS) return cachedScryfallMap;

  const res = await fetch("https://api.scryfall.com/sets", {
    // для server runtime можно кэшировать
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    // если Scryfall временно недоступен — возвращаем пустую карту
    return new Map();
  }

  const json = (await res.json()) as { data: ScryfallSet[] };

  const map = new Map<string, string>();
  for (const s of json.data) {
    if (s.code && s.icon_svg_uri) map.set(s.code, s.icon_svg_uri);
  }

  cachedScryfallMap = map;
  cachedAt = now;
  return map;
}

export async function GET() {
  try {
    await connectDB();

    // ВАЖНО: тут предполагается, что в твоих card docs есть поля set и set_name.
    const rows = (await Card.aggregate<SetAggRow>([
      { $match: { set: { $exists: true, $ne: "" } } },
      {
        $group: {
          _id: { set: "$set", set_name: "$set_name" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          set: "$_id.set",
          set_name: "$_id.set_name",
          count: 1,
        },
      },
      { $sort: { set_name: 1 } },
    ])) as SetAggRow[];

    const icons = await getScryfallIconMap();

    const items: SetSummary[] = rows.map((r) => ({
      ...r,
      iconSvgUrl: icons.get(r.set) ?? null,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (err) {
    console.error("❌ /api/sets/summary error:", err);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
