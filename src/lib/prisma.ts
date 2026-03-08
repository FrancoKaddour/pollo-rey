import path from "path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function resolveDbUrl(raw: string): string {
  // Convert relative file: URLs to absolute with forward slashes (required for libSQL on Windows)
  if (raw.startsWith("file:./") || raw.startsWith("file:../")) {
    const rel = raw.slice("file:".length);
    const abs = path.resolve(process.cwd(), rel).replace(/\\/g, "/");
    return "file:///" + abs.replace(/^\/+/, "");
  }
  return raw;
}

function createPrismaClient() {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  const url = resolveDbUrl(raw);
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
