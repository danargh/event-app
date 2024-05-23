"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { sendEmail } from "../actions/sendEmail";

type Props = {};

export default function Home({}: Props) {
   return (
      <div>
         <Button
            variant={"outline"}
            onClick={() => {
               sendEmail("danargh86@gmail.com" as string);
            }}
         >
            sendEmail
         </Button>
      </div>
   );
}
