import { PrismaClient } from "@prisma/client";


declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.DATABASE_URL) globalThis.prisma = db