import { type AuthOptions } from "next-auth";
// import GoggleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import User from "@/db/models/User";
import { connectDB } from "./db/db";


export const authConfig: AuthOptions = {
  providers: [

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),


    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          // name: user.name,
          name: `${user.firstName} ${user.lastName}`,
        };

      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name; // добавьте это!
        token.firstName = user.firstName;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string; // добавьте это!
        session.user.firstName = token.firstName as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

// export const { handlers, auth, signIn, signOut } =
//   NextAuth(authConfig);






// src/auth.ts
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";

// import { connectDB } from "@/db/db";
// import User from "@/db/models/User";

// export const {
//   handlers,
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         await connectDB();

//         const user = await User.findOne({ email: credentials.email })
//           .select("+password");

//         if (!user) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) return null;

//         return {
//           id: user._id.toString(),
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
// });

