import React from "react";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
   const session = await auth();

   return (
      <div>
         <h1>{JSON.stringify(session)}</h1>
         <form
            action={async () => {
               "use server";

               await signOut();
            }}
         >
            <Button type="submit" variant="destructive">
               Logout
            </Button>
         </form>
      </div>
   );
};

export default SettingsPage;
