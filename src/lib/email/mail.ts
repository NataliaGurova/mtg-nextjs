// src/lib/mail.ts
import { Resend } from "resend";

// Не забудьте добавить RESEND_API_KEY в ваш .env файл
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

export const sendVerificationEmail = async (
  email: string,
  token: string,
  firstName: string
) => {
  const confirmLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "MTG App <onboarding@resend.dev>", // 👈 Замените на ваш верифицированный домен в Resend перед релизом
    to: email,
    subject: "Підтвердьте ваш Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Привіт, ${firstName}!</h2>
        <p>Дякуємо за реєстрацію. Будь ласка, підтвердіть свій email, натиснувши на кнопку нижче:</p>
        <a href="${confirmLink}" style="display: inline-block; padding: 5px 20px; background-color: #1d5105; color: white; text-decoration: none; border-radius: 4px; margin-top: 16px; border-bottom: 3px solid #0e2902; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);">
          Підтвердити Email
        </a>
        <p style="margin-top: 24px; color: #666; font-size: 14px;">
          Якщо кнопка не працює, скопіюйте і вставте це посилання в браузер: <br/>
          <a href="${confirmLink}">${confirmLink}</a>
        </p>
        <p style="color: #666; font-size: 14px;">Посилання дійсне 24 години.</p>
      </div>
    `,
  });
};