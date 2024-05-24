import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import providers from "./providers";

const prisma = new PrismaClient();

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut,
} = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   ...providers,
});
