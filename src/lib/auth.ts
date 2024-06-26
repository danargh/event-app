import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import providers from "./auth.config";
import { getUserById } from "@/models/user";
// import { prisma } from "@/lib/database";

const prisma = new PrismaClient();

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut,
} = NextAuth({
   callbacks: {
      async session({ token, session }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }

         if (token.role && session.user) {
            session.user.role = token.role as UserRole;
         }

         return session;
      },
      async jwt({ token }) {
         if (!token.sub) {
            return token;
         }
         const existingUser = await getUserById(token.sub);
         if (!existingUser) {
            return token;
         }

         token.role = existingUser.role;

         return token;
      },
   },
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   ...providers,
});
