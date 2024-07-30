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
   title: z.string().min(1, "Title is required"),
   description: z.string().min(1, "Description is required"),
   location: z.string().min(1, "Location is required"),
   imageUrl: z.string().min(1, "Image URL is required"),
   startDateTime: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
   }),
   endDateTime: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!",
   }),
   price: z.string().min(1, "Price is required"),
   isFree: z.boolean(),
   url: z.string().min(1, "URL is required"),
});
