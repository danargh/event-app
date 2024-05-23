import NextAuth from "next-auth";
import ResendProvider from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import config from "@/config";
import { emailTemplate } from "@/components/ui/emailTemplate";

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
   providers: [
      ResendProvider({
         server: config.EMAIL_SERVER,
         from: config.EMAIL_FROM,
         sendVerificationRequest: async ({
            identifier,
            url,
            token,
            provider: { server, from },
            theme,
         }) => {
            const { RESEND_KEY } = config;
            const { host } = new URL(url);
            const res = await fetch("https://api.resend.com/emails", {
               method: "POST",
               headers: {
                  Authorization: `Bearer ${RESEND_KEY}`,
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  from: from,
                  to: identifier,
                  subject: `Sign in to ${host}`,
                  html: emailTemplate({ url, host, theme }),
               }),
            });
         },
      }),
   ],
});
