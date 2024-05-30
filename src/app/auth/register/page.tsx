"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver function from the correct path
import { RegisterSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { register } from "@/actions/auth";

export default function page() {
   const [error, setError] = useState("");
   const [sucess, setSucess] = useState("");
   const [isTransition, setTransition] = useTransition();

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
      setError("");
      setSucess("");

      setTransition(() => {
         register(data).then((res) => {
            setError(res.error || "");
            setSucess(res.success || "");
         });
      });
   };

   return (
      <div className="flex justify-center mx-auto h-screen">
         <Form {...form}>
            <form
               className="bg-secondary div__center--vertically max-w-[400px] h-fit p-6 rounded-lg shadow-md w-full"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <h2 className="flex justify-center text-2xl font-bold mb-4">
                  Register
               </h2>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder="john_doe"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
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
                              <Input {...field} type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="confirmPassword"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirm Password</FormLabel>
                           <FormControl>
                              <Input {...field} type="password" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               {error && <FormAlert type="error">{error}</FormAlert>}
               {sucess && <FormAlert type="success">{sucess}</FormAlert>}
               <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4 mb-2"
               >
                  Submit
               </Button>
               <p className="text-sm flex justify-center"> - or - </p>
               <Button
                  variant="outline"
                  className="flex justify-center mt-2 w-full text-primary"
               >
                  <Link href="/auth/login">Login</Link>
               </Button>
            </form>
         </Form>
      </div>
   );
}
