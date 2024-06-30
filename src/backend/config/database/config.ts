import type { IUserSession } from "@app/utils/domain/types/UserSession";
import { PrismaClient, type Role, type UserTheme } from "@prisma/client";
import type { Session } from "next-auth";



export type Context = {
  prisma: PrismaClient;
  session: IUserSession | null;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  t: any;
};

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
