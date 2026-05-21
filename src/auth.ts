
// // auth.ts
import { type AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import User from "@/db/models/User"
import { connectDB } from "@/db/db"

declare module "next-auth" {
  interface User {
    id: string
    firstName?: string
    lastName?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      firstName?: string
      lastName?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    firstName?: string
    lastName?: string
  }
}

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Введіть email та пароль");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) {
          throw new Error("Користувача з таким email не знайдено");
        }

        // // Блокируем вход пока email не подтверждён variant B
        // if (!user.emailVerified) {
        //   throw new Error("Будь ласка, підтвердіть ваш email перед входом.");
        // }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Невірний пароль");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.name = `${token.firstName} ${token.lastName}`;
      }
      return session;
    },
  },

  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
};