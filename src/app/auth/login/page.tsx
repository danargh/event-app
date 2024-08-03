"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver function from the correct path
import { LoginSchema } from "@/lib/validation";
import * as z from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import Link from "next/link";
import { login } from "@/actions/auth";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page() {
   const [error, setError] = useState("");
   const session = useSession();
   const [isTransition, setTransition] = useTransition();
   const router = useRouter();

   useEffect(() => {
      if (session) {
         router.push("/dashboard");
      }
   }, [router]);

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = (data: z.infer<typeof LoginSchema>) => {
      setError("");

      setTransition(() => {
         login(data).then((res) => {
            setError(res?.error || "");
         });
      });
      form.reset();
   };

   return (
      <div className="flex justify-center mx-auto h-screen">
         <Form {...form}>
            <form
               className="bg-secondary div__center--vertically max-w-[400px] h-fit p-6 rounded-lg shadow-md w-full"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <h2 className="flex justify-center text-2xl font-bold mb-4">
                  Login
               </h2>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="johndoe@gmail.com"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="johndoe@gmail.com"
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {error && <FormAlert type="error">{error}</FormAlert>}

               <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4 mb-2"
                  disabled={isTransition}
               >
                  Submit
               </Button>
               <p className="text-sm flex justify-center"> - or - </p>
               <Button
                  variant="outline"
                  className="flex justify-center mt-2 w-full text-primary"
               >
                  <Link href="/auth/register">Register</Link>
               </Button>
            </form>
         </Form>
      </div>
   );
}
