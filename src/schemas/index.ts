import * as z from "zod";

export const LoginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(1),
});

export const RegisterSchema = z
   .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string().min(1),
      confirmPassword: z.string().min(1),
   })
   .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
         ctx.addIssue({
            code: "custom",
            message: "The password did not match",
            path: ["confirmPassword"],
         });
      }
   });

export const EventSchema = z.object({
   title: z.string().min(1),
   description: z.string().nullable(),
   location: z.string().nullable(),
   imageUrl: z.string(),
   startDateTime: z.date(),
   endDateTime: z.date(),
   price: z.string(),
   isFree: z.boolean(),
   url: z.string().nullable(),
   userId: z.string(),
   categoryId: z.string(),
   createdAt: z.date(),
   updatedAt: z.date(),
});
