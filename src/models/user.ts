// make getuserbyemail
import { prisma } from "@/lib/database";

export const getUserByEmail = async (email: string) => {
   const user = await prisma.user.findUnique({
      where: {
         email,
      },
   });

   return user;
};
