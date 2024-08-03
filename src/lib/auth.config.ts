import ResendProvider from "next-auth/providers/resend";
import config from "@/config";
import { emailTemplate } from "@/components/ui/emailTemplate";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/models/user";

export default {
   providers: [
      Credentials({
         credentials: {
            username: { label: "Username" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials, request) {
            const validatedFields = LoginSchema.safeParse(credentials);
            if (validatedFields.success) {
               const { email, password } = validatedFields.data;

               const user = await getUserByEmail(email);
               if (!user || !user.password) return null;

               const passwordsMatch = await bcrypt.compare(
                  password,
                  user.password
               );

               if (passwordsMatch) return user;
            }

            // Add your authorization logic here and return a User object or null
            return null;
         },
      }),

      // ResendProvider({
      //    server: config.EMAIL_SERVER,
      //    from: config.EMAIL_FROM,
      //    sendVerificationRequest: async ({
      //       identifier,
      //       url,
      //       token,
      //       provider: { server, from },
      //       theme,
      //    }) => {
      //       const { RESEND_KEY } = config;
      //       const { host } = new URL(url);
      //       const res = await fetch("https://api.resend.com/emails", {
      //          method: "POST",
      //          headers: {
      //             Authorization: `Bearer ${RESEND_KEY}`,
      //             "Content-Type": "application/json",
      //          },
      //          body: JSON.stringify({
      //             from: from,
      //             to: identifier,
      //             subject: `Sign in to ${host}`,
      //             html: emailTemplate({ url, host, theme }),
      //          }),
      //       });
      //    },
      // }),
      // GoogleProvider({
      //    // clientId: config.GOOGLE_ID,
      //    // clientSecret: config.GOOGLE_SECRET,
      // }),
   ],
} satisfies NextAuthConfig;
