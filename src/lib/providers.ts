import ResendProvider from "next-auth/providers/resend";
import config from "@/config";
import { emailTemplate } from "@/components/ui/emailTemplate";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";

export default {
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
      GoogleProvider({
         // clientId: config.GOOGLE_ID,
         // clientSecret: config.GOOGLE_SECRET,
      }),
   ],
} satisfies NextAuthConfig;
