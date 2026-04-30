import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'node:path';

function createPrismaClient() {
  const dbPath = path.resolve(process.cwd(), 'dev.db');
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis;
const prisma = globalForPrisma.__prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__prisma = prisma;
}

export default prisma;
