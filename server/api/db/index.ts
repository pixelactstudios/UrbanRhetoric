import { PrismaClient } from '@prisma/client';
import { env } from '@/env.mjs';

// Cache the Prisma client in development. This avoids creating a new client on every HMR update.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
