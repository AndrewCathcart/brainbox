import { PrismaClient } from "@prisma/client/edge";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

// avoid multiple prisma client instances in dev due to hot reloads
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb;
}

export default prismadb;
