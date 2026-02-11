// import ResetPasswordForm from "@/components/auth/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div>
      <h1>Сброс пароля</h1>
      {/* <ResetPasswordForm /> */}
    </div>
  )
}

export default ResetPasswordPage;


// import { NextResponse } from "next/server"
// import crypto from "crypto"
// import bcrypt from "bcrypt"
// import { connectDB } from "@/db/db"
// import User from "@/db/models/User"

// export async function POST(req: Request) {
//   const { token, password } = await req.json()

//   await connectDB()

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex")

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   })

//   if (!user) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 400 }
//     )
//   }

//   user.password = await bcrypt.hash(password, 10)
//   user.resetPasswordToken = undefined
//   user.resetPasswordExpire = undefined

//   await user.save()

//   return NextResponse.json({ message: "Password updated" })
// }
