// // src/app/api/auth/register/route.ts
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, password } = body;

//     // 1. Базовая валидация (проверяем, что все поля заполнены)
//     if (!firstName || !lastName || !email || !password) {
//       return NextResponse.json(
//         { message: "Пожалуйста, заполните все поля" },
//         { status: 400 }
//       );
//     }

//     // Опционально: проверка длины пароля
//     if (password.length < 6) {
//       return NextResponse.json(
//         { message: "Пароль должен содержать минимум 6 символов" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     // 2. Проверяем, не занят ли email (приводим к нижнему регистру для надежности)
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return NextResponse.json(
//         { message: "Пользователь с таким email уже существует" },
//         { status: 400 } // 400 Bad Request
//       );
//     }

//     // 3. Хэшируем пароль (10 - это salt rounds, стандартное и надежное значение)
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4. Создаем нового пользователя
//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//     });

//     // 5. Возвращаем успешный ответ (пароль, естественно, не отправляем)
//     return NextResponse.json(
//       {
//         message: "Пользователь успешно зарегистрирован",
//         user: {
//           id: newUser._id,
//           firstName: newUser.firstName,
//           lastName: newUser.lastName,
//           email: newUser.email,
//         },
//       },
//       { status: 201 } // 201 Created
//     );

//   } catch (error) {
//     console.error("❌ Ошибка при регистрации:", error);
//     return NextResponse.json(
//       { message: "Внутренняя ошибка сервера" },
//       { status: 500 }
//     );
//   }
// }






// await fetch(`${process.env.NEXTAUTH_URL}/api/auth/send-verification`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ email: data.email }),
// })

// // Не логиним сразу — редиректим на страницу "проверьте почту"
// return NextResponse.json({ redirect: '/check-email' })



// // src/app/api/auth/register/route.ts (обновленная версия с поддержкой email верификации)

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import crypto from "crypto"; // Для генерации токена
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";
// import { sendVerificationEmail } from "@/lib/mail"; // Ваша функция отправки письма

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, password } = body;

//     // 1. Базовая валидация
//     if (!firstName || !lastName || !email || !password) {
//       return NextResponse.json(
//         { message: "Пожалуйста, заполните все поля" },
//         { status: 400 }
//       );
//     }

//     if (password.length < 6) {
//       return NextResponse.json(
//         { message: "Пароль должен содержать минимум 6 символов" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const normalizedEmail = email.toLowerCase();
//     const existingUser = await User.findOne({ email: normalizedEmail });

//     // 2. Генерируем токен и срок его действия (24 часа)
//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     const tokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000);

//     // 3. Обработка, если пользователь уже существует
//     if (existingUser) {
//       // Если почта еще НЕ подтверждена (emailVerified === false)
//       if (!existingUser.emailVerified) {
//         // Обновляем токен, дату и пароль
//         existingUser.emailVerificationToken = verificationToken;
//         existingUser.emailVerificationTokenExpire = tokenExpire;
//         existingUser.password = await bcrypt.hash(password, 10);
        
//         await existingUser.save();

//         // Отправляем новое письмо
//         await sendVerificationEmail(existingUser.email, verificationToken, existingUser.firstName);

//         return NextResponse.json(
//           { message: "Аккаунт уже существует, но не подтвержден. Мы отправили новое письмо со ссылкой." },
//           { status: 200 }
//         );
//       }

//       // Если почта УЖЕ подтверждена
//       return NextResponse.json(
//         { message: "Пользователь с таким email уже существует" },
//         { status: 400 }
//       );
//     }

//     // 4. Создание нового пользователя
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       firstName,
//       lastName,
//       email: normalizedEmail,
//       password: hashedPassword,
//       // Вставляем поля точно так, как они названы в вашей схеме
//       emailVerified: false,
//       emailVerificationToken: verificationToken,
//       emailVerificationTokenExpire: tokenExpire,
//     });

//     // 5. Отправляем письмо для активации
//     await sendVerificationEmail(newUser.email, verificationToken, newUser.firstName);

//     return NextResponse.json(
//       { message: "Регистрация успешна! Проверьте вашу почту для активации аккаунта." },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("❌ Ошибка при регистрации:", error);
//     return NextResponse.json(
//       { message: "Внутренняя ошибка сервера" },
//       { status: 500 }
//     );
//   }
// }



// variant B

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";
import Token from "@/db/models/Token";
import { sendVerificationEmail } from "@/lib/email/mail";

const TOKEN_EXPIRES_MS = 24 * 60 * 60 * 1000; // 24 часа

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Валидация
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Будь ласка, заповніть усі поля" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Пароль повинен містити мінімум 6 символів" },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Проверяем занятость email
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з таким email вже існує" },
        { status: 400 }
      );
    }

    // 3. Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Создаём пользователя (emailVerified: false по умолчанию)
    const newUser = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 5. Создаём токен верификации в отдельной коллекции
    const token   = crypto.randomUUID();
    const expires = new Date(Date.now() + TOKEN_EXPIRES_MS);

    await Token.create({
      email: normalizedEmail,
      token,
      type: "email_verification",
      expires,
    });

    // 6. Отправляем письмо
    await sendVerificationEmail(normalizedEmail, token, newUser.firstName);

    return NextResponse.json(
      {
        message: "Реєстрація успішна! Перевірте пошту для підтвердження email.",
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Помилка при реєстрації:", error);
    return NextResponse.json(
      { message: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}