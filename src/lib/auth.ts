import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import config from "@/config";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      Resend({
         apiKey: config.RESEND_KEY,
         from: "no-reply@company.com",
      }),
   ],
});
