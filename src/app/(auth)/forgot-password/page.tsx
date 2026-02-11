// import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm/ForgotPasswordForm";

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm/ForgotPasswordForm";


const ForgotPasswordPage = () => {
  return (
    <div>
      <h1>Забыли пароль?</h1>
      <ForgotPasswordForm />
    </div>
  )
}

export default ForgotPasswordPage;

// import { NextResponse } from "next/server"
// import { Resend } from "resend"
// import crypto from "crypto"

// import { connectDB } from "@/db/db"
// import User from "@/db/models/User"


// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(req: Request) {
//   const { email } = await req.json()

//   await connectDB()

//   const user = await User.findOne({ email })

//   if (!user) {
//     return NextResponse.json({ message: "OK" })
//   }

//   const resetToken = crypto.randomBytes(32).toString("hex")

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex")

//   user.resetPasswordToken = hashedToken
//   user.resetPasswordExpire = Date.now() + 15 * 60 * 1000
//   await user.save()

//   const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`

//   await resend.emails.send({
//     from: "Citadel <onboarding@resend.dev>",
//     to: email,
//     subject: "Сброс пароля",
//     html: `
//       <h2>Сброс пароля</h2>
//       <p>Нажмите кнопку ниже:</p>
//       <a href="${resetUrl}">Сбросить пароль</a>
//     `,
//   })

//   return NextResponse.json({ message: "Email sent" })
// }
