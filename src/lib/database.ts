import config from "@/config";
import { PrismaClient } from "@prisma/client";

declare global {
   var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prisma || new PrismaClient();

if (config.NODE_ENV === "development") {
   global.prisma = prisma;
}
