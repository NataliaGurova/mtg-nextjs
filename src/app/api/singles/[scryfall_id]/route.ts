
import { NextResponse } from "next/server";
import type { DbCard } from "@/types/types";
import Card from "@/db/models/Card";
import { connectDB } from "@/db/db";
import type { NextRequest } from "next/server";

// 1. Оборачиваем объект params в Promise (требование Next.js 15)
type Params = { params: Promise<{ scryfall_id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    // 2. Обязательно "дожидаемся" (await) параметров перед использованием
    const resolvedParams = await params;
    const { scryfall_id } = resolvedParams;

    const card = await Card.findOne({ scryfall_id }).lean<DbCard>();

    if (!card) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...card,
      _id: card._id.toString(), // обязательно string для Client Components
    });
  } catch (error) {
    console.error("Single card fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}