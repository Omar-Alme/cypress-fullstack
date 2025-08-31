import { PrismaClient } from "@/generated/prisma"; 

const globalForPrisma = globalThis as unknown as { __db?: PrismaClient };

export const db =
    globalForPrisma.__db ??
    new PrismaClient({
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__db = db;
}
