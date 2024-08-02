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
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { DollarSign } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Dropdown from "../ui/dropdown";

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
      console.log(data);
      // setError("");

      // setTransition(() => {
      //    let uploadedImageUrl = data.imageUrl;

      //    if (files.length > 0) {
      //       // const uploadedImages = await startUpload(files)
      //       // if (!uploadedImages) {
      //       //    return
      //       // }
      //       // uploadedImageUrl = uploadedImages[0].url;
      //    }
      // });
      // form.reset();
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
                     name="categoryId"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Category</FormLabel>
                           <FormControl>
                              <Dropdown
                                 onChangeHandler={field.onChange}
                                 value={field.value}
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
                              <Textarea
                                 className=""
                                 placeholder="Description"
                                 {...field}
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
                                    placeholder="yyyy-MM-ddThh:mm"
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
                        <FormItem className="w-full">
                           <FormLabel>Price</FormLabel>
                           <FormControl>
                              <div className="flex gap-x-4">
                                 <Input
                                    type="number"
                                    placeholder="Price"
                                    {...field}
                                    className=""
                                 />
                                 <FormField
                                    control={form.control}
                                    name="isFree"
                                    render={({ field }) => (
                                       <FormItem className="flex items-center justify-end">
                                          <FormControl>
                                             <div className="flex items-center justify-end">
                                                <label
                                                   htmlFor="isFree"
                                                   className="text-nowrap pr-4"
                                                >
                                                   Free Ticket
                                                </label>
                                                <Checkbox
                                                   onCheckedChange={
                                                      field.onChange
                                                   }
                                                   checked={field.value}
                                                   id="isFree"
                                                   className="mr-2 h-5 w-5 border-2 border-primary-500"
                                                />
                                             </div>
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="url"
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Url</FormLabel>
                           <FormControl>
                              <div className="flex">
                                 <Input placeholder="URL" {...field} />
                              </div>
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
