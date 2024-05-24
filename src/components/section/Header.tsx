import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

export default function Header({}: Props) {
   return (
      <header className="w-full border-b">
         <div className="wrapper flex items-center justify-between">
            <Link href="/" className="w-36 flex gap-x-1 items-center">
               <Image
                  src="/favicon.svg"
                  width={38}
                  height={38}
                  alt="Event Logo"
               />
               <h4 className=" text-xl font-bold">EventApp</h4>
            </Link>
            <nav>
               <ul className="flex justify-center items-center gap-x-4">
                  <li>
                     <Link href="/events">Events</Link>
                  </li>
                  <li>
                     <Link href="/events/new">Create Event</Link>
                  </li>
                  <li>
                     <Link href="/login">
                        <Button variant={"default"}>Login</Button>
                     </Link>
                  </li>
                  <li>
                     <Link href="/register">
                        <Button variant={"outline"}>Register</Button>
                     </Link>
                  </li>
               </ul>
            </nav>
         </div>
      </header>
   );
}
