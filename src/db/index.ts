import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' }); // or .env.local

const client = postgres(process.env.DATABASE_URL!);
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in the environment variables.");
  }  
export const db = drizzle(client);
