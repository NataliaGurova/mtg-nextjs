// import crypto from "crypto";

// const token = crypto.randomBytes(32).toString("hex");

// user.resetPasswordToken = crypto
//   .createHash("sha256")
//   .update(token)
//   .digest("hex");

// user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15); // 15 мин
// await user.save();


// // app/api/auth/forgot-password/route.ts
// import crypto from "crypto";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export async function POST(req: Request) {
//   const { email } = await req.json();
//   await connectDB();

//   const user = await User.findOne({ email });
//   if (user) {
//     const token = crypto.randomBytes(32).toString("hex");

//     user.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex");

//     user.resetPasswordExpires = Date.now() + 1000 * 60 * 30; // 30 min
//     await user.save();

//     // TODO: send email
//   }

//   return Response.json({ success: true });
// }

import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";

import { sendResetEmail } from "@/lib/email/sendResetEmail";


export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();

  const user = await User.findOne({ email });

  // всегда одинаковый ответ
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${rawToken}`;

  // TODO: отправка email
  console.log("RESET LINK:", resetUrl);

  await sendResetEmail(email, rawToken);

  return NextResponse.json({ ok: true });
}


// import { NextResponse } from "next/server";
// import crypto from "crypto";

// import { dbConnect } from "@/lib/dbConnect";
// import User from "@/models/User";
// import { sendResetEmail } from "@/lib/email/sendResetEmail";

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (!user) {
//     // ⚠️ специально всегда OK (security)
//     return NextResponse.json({ ok: true });
//   }

//   const token = crypto.randomBytes(32).toString("hex");

//   user.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
//   await user.save();

//   await sendResetEmail(email, token);

//   return NextResponse.json({ ok: true });
// }


