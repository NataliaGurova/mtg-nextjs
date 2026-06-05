// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth"; // Проверьте путь к конфигу
import { connectDB } from "@/db/db";
import Cart from "@/db/models/Cart";
import Card from "@/db/models/Card";

// 🔹 ─── GET /api/cart ─────────────────────────────────
export async function GET() {

  console.log("Card model registered:", !!Card); // Это формальное использование
  try {
    // Проверяем, залогинен ли пользователь
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    await connectDB();

    // Ищем корзину и сразу "раскрываем" данные карточек через populate
    const cart = await Cart.findOne({ userId: session.user.id }).populate("items.cardId");

    // Если корзины еще нет, возвращаем пустой массив
    if (!cart) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json({ items: cart.items }, { status: 200 });
  } catch (error) {
    console.error("Помилка при отриманні корзини:", error);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}

// 🔹  ─── POST /api/cart ───────────────────────────────
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body; // Ожидаем массив: [{ cardId: "...", quantity: 1 }]

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { message: "Невірний формат даних" },
        { status: 400 }
      );
    }

    await connectDB();

    // 🔹 Маппінг: розділяємо карти і фулсети
    //    Карта:   { cardId: "abc123", quantity: 1 }
    //    Фулсет: { fullsetCode: "ala", quantity: 1 }
    const dbItems = items
      .filter((i) => i.cardId || i.fullsetCode)
      .map((i) => ({
        cardId:      i.fullsetCode ? null : i.cardId,
        fullsetCode: i.fullsetCode ?? null,
        quantity:    i.quantity,
      }));
      
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { items: dbItems } },
      { new: true, upsert: true }
    ).populate("items.cardId");

    return NextResponse.json(
      { message: "Корзина синхронизирована", items: updatedCart.items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка при обновленні корзини:", error);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}