"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import the zodResolver function from the correct path
import { EventSchema, LoginSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";

type Props = {
   userId: string;
   type: "Create" | "Update";
   event?: z.infer<typeof EventSchema>;
   eventId?: string;
};

export const eventDefaultValues = {
   title: "",
   description: "",
   location: "",
   imageUrl: "",
   startDateTime: new Date(),
   endDateTime: new Date(),
   categoryId: "",
   price: "",
   isFree: false,
   url: "",
};

export default function EventForm({ userId, type, event, eventId }: Props) {
   const [error, setError] = useState("");
   const [files, setFiles] = useState<File[]>([]);
   const initialValues =
      event && type === "Update" ? event : eventDefaultValues;
   const router = useRouter();

   // const { startUpload } = useUpload("imageUploader");

   const [isTransition, setTransition] = useTransition();
   const form = useForm<z.infer<typeof EventSchema>>({
      resolver: zodResolver(EventSchema),
      defaultValues: initialValues,
   });

   const onSubmit = (data: z.infer<typeof EventSchema>) => {
      setError("");

      setTransition(() => {
         let uploadedImageUrl = data.imageUrl;

         if (files.length > 0) {
            // const uploadedImages = await startUpload(files)
            // if (!uploadedImages) {
            //    return
            // }
            // uploadedImageUrl = uploadedImages[0].url;
         }
      });
      form.reset();
   };

   return (
      <div className="flex justify-center mx-auto h-screen">
         <Form {...form}>
            <form
               className="div__center--vertically flex flex-col gap-y-5 w-full h-fit p-6 rounded-lg "
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <h2 className="flex justify-center text-2xl font-bold mb-4">
                  Create Event
               </h2>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Title</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="Clash of Clans"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="something"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="location"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Location</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="something"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex flex-col gap-y-4">
                  <FormField
                     control={form.control}
                     name="imageUrl"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Picture</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="something"
                                 type="file"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex gap-x-3">
                  <div className="flex flex-col gap-y-4 w-full">
                     <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Start Date Time</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    disabled={isTransition}
                                    placeholder="something"
                                    type="datetime-local"
                                    value={field.value.toString()}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex flex-col gap-y-4 w-full">
                     <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>End Date Time</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    disabled={isTransition}
                                    placeholder="something"
                                    type="datetime-local"
                                    value={field.value.toString()}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <div className="flex flex-col gap-y-4 w-full">
                  <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Price</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isTransition}
                                 placeholder="something"
                                 type="number"
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
                  Create
               </Button>
            </form>
         </Form>
      </div>
   );
}
