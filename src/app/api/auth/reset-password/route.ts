// app/api/auth/reset-password/route.ts
// import crypto from "crypto";
// import bcrypt from "bcrypt";
// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export async function POST(req: Request) {
//   const { token, password } = await req.json();
//   await connectDB();

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpires: { $gt: Date.now() },
//   }).select("+password");

//   if (!user) {
//     return Response.json(
//       { error: "Invalid or expired token" },
//       { status: 400 }
//     );
//   }

//   user.password = await bcrypt.hash(password, 10);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;

//   await user.save();

//   return Response.json({ success: true });
// }


import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { connectDB } from "@/db/db";
import User from "@/db/models/User";


export async function POST(req: Request) {
  await connectDB();

  const { token, password } = await req.json();

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Token invalid or expired" },
      { status: 400 }
    );
  }

  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return NextResponse.json({ ok: true });
}


// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import bcrypt from "bcrypt";

// import { dbConnect } from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   const { token, password } = await req.json();

//   await dbConnect();

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     return NextResponse.json(
//       { message: "Invalid or expired token" },
//       { status: 400 }
//     );
//   }

//   user.password = await bcrypt.hash(password, 10);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;

//   await user.save();

//   return NextResponse.json({ ok: true });
// }
