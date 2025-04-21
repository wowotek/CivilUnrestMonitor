import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the .env file.");
}

export const controller = drizzle(process.env.DATABASE_URL!);

export default controller;