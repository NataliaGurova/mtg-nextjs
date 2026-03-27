// import { handlers } from "@/auth";

// export const { GET, POST } = handlers;
// app/api/auth/[...nextauth]/route

import NextAuth from "next-auth";
import { authConfig } from "@/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
