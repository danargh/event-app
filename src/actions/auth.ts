"use server";

import * as z from "zod";
import { LoginSchema, RegisterSchema } from "@/lib/validation";
import { signIn, signOut } from "@/lib/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/database";
import { getUserByEmail } from "@/models/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
   const validatedFields = LoginSchema.safeParse(values);

   if (!validatedFields.success) {
      return { error: "Invalid fields" };
   }

   const { email, password } = validatedFields.data;

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin": {
               return { error: "Invalid credentials" };
            }
            default: {
               return { error: "Something went wrong!" };
            }
         }
      }
      throw error;
   }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
   const validatedFields = RegisterSchema.safeParse(values);

   if (!validatedFields.success) {
      return { error: "Invalid fields" };
   }

   const { name, email, password } = validatedFields.data;
   const hashedPassword = await bcryptjs.hash(password, 10);

   const existingUser = await getUserByEmail(email);

   if (existingUser) {
      return { error: "User is already exists" };
   }

   await db.user.create({
      data: {
         name,
         email,
         password: hashedPassword,
      },
   });

   return { success: "User created successfully" };
};
