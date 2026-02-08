// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// import User from "@/db/models/User";
// import { connectDB } from "@/db/db";

// export async function POST(req: Request) {
//   try {
//     const { email, password, name } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password required" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       email,
//       password: hashedPassword,
//       name,
//     });

//     return NextResponse.json({ ok: true }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Registration failed" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/db/db";
import User from "@/db/models/User";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


// // ----------------------
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { firstName, lastName, email, password } = body;

//     if (!email || !password || !firstName || !lastName) {
//       return NextResponse.json(
//         { message: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 409 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       name: `${firstName} ${lastName}`,
//       email,
//       password: hashedPassword,
//     });

//     return NextResponse.json(
//       { message: "User created" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("REGISTER ERROR:", error);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }


