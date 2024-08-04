import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
                        <li>
                           <AlertDialog>
                              <AlertDialogTrigger className="flex items-center gap-x-2">
                                 <Image
                                    src="favicon.svg"
                                    width={38}
                                    height={38}
                                    alt="Profile"
                                    className="rounded-full"
                                 ></Image>
                                 {session.user?.name}
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white">
                                 <AlertDialogHeader>
                                    <AlertDialogTitle>
                                       Profile Info
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                       <table className="w-full">
                                          <tr>
                                             <td>Email</td>
                                             <td>: {session.user?.email}</td>
                                          </tr>
                                          <tr>
                                             <td>Name</td>
                                             <td>: {session.user?.name}</td>
                                          </tr>
                                          <tr>
                                             <td>Role</td>
                                             <td>: {session.user?.role}</td>
                                          </tr>
                                       </table>
                                    </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter className="flex justify-between">
                                    <form
                                       action={async () => {
                                          "use server";

                                          await signOut();
                                       }}
                                    >
                                       <Button
                                          type="submit"
                                          variant="destructive"
                                       >
                                          Logout
                                       </Button>
                                    </form>
                                    <AlertDialogCancel>
                                       Cancel
                                    </AlertDialogCancel>
                                 </AlertDialogFooter>
                              </AlertDialogContent>
                           </AlertDialog>
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
