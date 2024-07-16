import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

type Props = {};

export const Header = async ({}: Props) => {
   const session = await auth();

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
               <ul className="flex justify-center items-center gap-x-6">
                  {session ? (
                     <>
                        <li>
                           <Button variant={"secondary"}>Events</Button>
                        </li>
                        <li>
                           <Button variant={"default"}>
                              <Link href={"dashboard/events/create"}>
                                 Create Event
                              </Link>
                           </Button>
                        </li>
                     </>
                  ) : (
                     <>
                        <li>
                           <Link href="/auth/login">
                              <Button variant={"default"}>Login</Button>
                           </Link>
                        </li>
                        <li>
                           <Link href="/auth/register">
                              <Button variant={"outline"}>Register</Button>
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </nav>
         </div>
      </header>
   );
};

export default Header;
