// // src/app/api/auth/verify-email/route.ts

// import { NextResponse } from "next/server";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { token } = body;

//     // 1. Проверяем, передан ли токен
//     if (!token) {
//       return NextResponse.json(
//         { message: "Токен не предоставлен" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     // 2. Находим пользователя с таким токеном
//     // Условие $gt: Date.now() гарантирует, что токен еще не просрочен
//     const user = await User.findOne({
//       emailVerificationToken: token,
//       emailVerificationTokenExpire: { $gt: Date.now() },
//     });

//     // 3. Если пользователь не найден (токен неверный или просрочен)
//     if (!user) {
//       return NextResponse.json(
//         { message: "Неверный или просроченный токен подтверждения" },
//         { status: 400 }
//       );
//     }

//     // 4. Если всё ок — меняем статус на подтвержденный и удаляем данные токена
//     user.emailVerified = true;
//     user.emailVerificationToken = undefined;
//     user.emailVerificationTokenExpire = undefined;

//     await user.save();

//     // 5. Возвращаем успешный ответ
//     return NextResponse.json(
//       { message: "Email успешно подтвержден! Теперь вы можете войти в аккаунт." },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("❌ Ошибка при верификации email:", error);
//     return NextResponse.json(
//       { message: "Внутренняя ошибка сервера" },
//       { status: 500 }
//     );
//   }
// }

// =============================================================
// clause various B
import { NextResponse } from "next/server";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";
import Token from "@/db/models/Token";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    // 1. Проверяем наличие токена
    if (!token) {
      return NextResponse.json(
        { message: "Токен не надано" },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Ищем токен в коллекции Token
    const tokenDoc = await Token.findOne({
      token,
      type: "email_verification",
      expires: { $gt: new Date() }, // токен ещё не просрочен
    });

    if (!tokenDoc) {
      return NextResponse.json(
        { message: "Невірний або прострочений токен підтвердження" },
        { status: 400 }
      );
    }

    // 3. Ищем пользователя по email из токена
    const user = await User.findOne({ email: tokenDoc.email });

    if (!user) {
      return NextResponse.json(
        { message: "Користувача не знайдено" },
        { status: 404 }
      );
    }

    // 4. Уже подтверждён — не делаем лишних операций
    if (user.emailVerified) {
      await Token.deleteOne({ _id: tokenDoc._id });
      return NextResponse.json(
        { message: "Email вже підтверджено. Можете увійти в акаунт." },
        { status: 200 }
      );
    }

    // 5. Подтверждаем email и удаляем токен
    await Promise.all([
      User.updateOne({ _id: user._id }, { emailVerified: true }),
      Token.deleteOne({ _id: tokenDoc._id }),
    ]);

    return NextResponse.json(
      { message: "Email успішно підтверджено! Тепер ви можете увійти в акаунт." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Помилка при верифікації email:", error);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}