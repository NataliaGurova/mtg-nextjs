// src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth"; // Проверьте путь к конфигу
import { connectDB } from "@/db/db";
import Cart from "@/db/models/Cart";

// 🔹 1. ПОЛУЧЕНИЕ КОРЗИНЫ ИЗ БАЗЫ (GET)
export async function GET() {
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
    console.error("Ошибка при получении корзины:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}

// 🔹 2. СИНХРОНИЗАЦИЯ КОРЗИНЫ С БАЗОЙ (POST)
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
        { message: "Неверный формат данных" },
        { status: 400 }
      );
    }

    await connectDB();

    // Магия MongoDB: findOneAndUpdate с параметром upsert: true.
    // Если корзина для этого юзера есть — она обновится.
    // Если её еще нет (первая покупка) — она автоматически создастся!
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { items: items } },
      { new: true, upsert: true }
    ).populate("items.cardId");

    return NextResponse.json(
      { message: "Корзина синхронизирована", items: updatedCart.items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обновлении корзины:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}