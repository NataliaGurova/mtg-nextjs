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




// неизвестній код

// import { loginUser } from "@/lib/auth";
// import NextAuth, { CredentialsSignin, User } from "next-auth"
// import { type JWT } from "next-auth/jwt";
// import Credentials from "next-auth/providers/credentials"
 
// // Access time is shorter than backend to prompt a refresh
// export const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60;              // 45 minutes
// export const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60;    // 6 days
 
// export const getCurrentEpochTime = () => {
//     return Math.floor(Date.now() / 1000);
// };
 
// export function shouldUpdateToken(token: JWT): boolean {
//     return token.accessExp <= getCurrentEpochTime()
// }
 
// export class InvalidLoginError extends CredentialsSignin {
//     constructor(message: string) {
//         super(message);
//         this.code = message;
//     }
// }
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//     session: {
//         strategy: "jwt",
//         maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
//     },
//     providers: [
//         Credentials({
//             name: "credentials",
//             credentials: {
//                 username: { label: "Username", type: "text" },
//                 password: { label: "Password", type: "password" }
//             },
//             authorize: async (credentials) => {
//                 if (!credentials || !credentials.password || !credentials.username) {
//                     throw new Error("Missing credentials: " + credentials);
//                 }
 
//                 try {
//                     const loginResponse = await loginUser({
//                         username: credentials.username as string,
//                         password: credentials.password as string,
//                     });
 
//                     return {
//                         id: loginResponse.user.pk.toString(),
//                         username: loginResponse.user.username,
//                         email: loginResponse.user.email,
//                         firstName: loginResponse.user.first_name,
//                         lastName: loginResponse.user.last_name,
//                         accessToken: loginResponse.access,
//                         accessExp: getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME,
//                         refreshToken: loginResponse.refresh,
//                         emailVerified: loginResponse.user.is_verified,
//                     } as User;
//                 } catch (error) {
//                     if (typeof (error) === "object") {
//                         throw new InvalidLoginError(JSON.stringify(error));
//                     }
//                     throw new InvalidLoginError("InvalidCredentials");
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, user, account }) {
//             // If `user` and `account` are set, that means it's a login event 
//             if (user && account) {
//                 // we only support credentials login
//                 if (account?.type !== "credentials") {
//                     throw new Error("Invalid Login Type: " + account?.type);
//                 }
//                 return {
//                     ...token,
//                     user: user,
//                     accessToken: user.accessToken,
//                     refreshToken: user.refreshToken,
//                     accessExp: user.accessExp,
//                 }
//             }
//             return token;
//         },
//         async session({ token, session }) {
//             return {
//                 ...session,
//                 user: token.user,
//                 accessToken: token.accessToken,
//             }
//         },
//         authorized: async ({ auth }) => {
//             // Logged in users are authenticated, otherwise redirect to login page
//             return !!auth
//         },
//     },
//     pages: {
//         signIn: "/login",
//         // TODO: signOut: "/logout",
//     },
// })
