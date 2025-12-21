// Example: Assuming you use Node.js and Postgres
import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// 2. Set up the connection pool and adapter
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, // Neon requires TLS; disable CA check for simplicity
});
const adapter = new PrismaPg(pool);


export const prisma = new PrismaClient({
    adapter: adapter,
});