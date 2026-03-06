import { PrismaClient } from "../prisma/generated/client/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// @ts-ignore
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
