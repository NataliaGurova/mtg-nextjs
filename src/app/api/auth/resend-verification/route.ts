import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email/mail";
import User from "@/db/models/User";
import Token from "@/db/models/Token";
import { connectDB } from "@/db/db";

const RESEND_COOLDOWN_MS = 5 * 60 * 1000;   // 5 минут между отправками
const TOKEN_EXPIRES_MS   = 24 * 60 * 60 * 1000; // токен живёт 24 часа

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email } = body;

    // --- 1. Валидация ---
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email обов'язковий" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // --- 2. Ищем пользователя ---
    const user = await User.findOne({ email: normalizedEmail });

    // Не раскрываем существует ли аккаунт
    if (!user) {
      return NextResponse.json(
        { message: "Якщо акаунт існує, лист буде надіслано" },
        { status: 200 }
      );
    }

    // --- 3. Email уже подтверждён ---
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email вже підтверджено" },
        { status: 409 }
      );
    }

    // --- 4. Cooldown — не спамим письмами ---
    const existingToken = await Token.findOne({
      email: normalizedEmail,
      type: "email_verification",
    });

    if (existingToken) {
      const timeSinceCreated =
        Date.now() - new Date(existingToken.createdAt).getTime();

      if (timeSinceCreated < RESEND_COOLDOWN_MS) {
        const secondsLeft = Math.ceil(
          (RESEND_COOLDOWN_MS - timeSinceCreated) / 1000
        );
        return NextResponse.json(
          {
            error: `Зачекайте ${secondsLeft} секунд перед повторним надсиланням`,
            retryAfterSeconds: secondsLeft,
          },
          { status: 429 }
        );
      }

      // Удаляем старый токен
      await Token.deleteOne({ _id: existingToken._id });
    }

    // --- 5. Создаём новый токен ---
    
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + TOKEN_EXPIRES_MS);

    await Token.create({
      email: normalizedEmail,
      token,
      type: "email_verification",
      expires,
    });

    // --- 6. Отправляем письмо ---
    await sendVerificationEmail(normalizedEmail, token, user.firstName);

    return NextResponse.json(
      { message: "Лист надіслано. Перевірте пошту" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RESEND_VERIFICATION_ERROR]", error);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}

