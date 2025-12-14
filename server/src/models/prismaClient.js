import {PrismaClient} from "@prisma/client";

//  const prisma = new PrismaClient();
const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
    log:["query","info","warn","error"]
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

