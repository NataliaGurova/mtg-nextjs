// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Базовая валидация (проверяем, что все поля заполнены)
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Пожалуйста, заполните все поля" },
        { status: 400 }
      );
    }

    // Опционально: проверка длины пароля
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Пароль должен содержать минимум 6 символов" },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Проверяем, не занят ли email (приводим к нижнему регистру для надежности)
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 400 } // 400 Bad Request
      );
    }

    // 3. Хэшируем пароль (10 - это salt rounds, стандартное и надежное значение)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Создаем нового пользователя
    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // 5. Возвращаем успешный ответ (пароль, естественно, не отправляем)
    return NextResponse.json(
      {
        message: "Пользователь успешно зарегистрирован",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          email: newUser.email,
        },
      },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error("❌ Ошибка при регистрации:", error);
    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}