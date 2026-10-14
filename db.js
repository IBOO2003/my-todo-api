import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in production");
}
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL exists:", Boolean(process.env.DATABASE_URL));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);

export default pool;

// postgresql://postgres:tfipYzAHakFTAlvuGkNkftMzdvVexxcu@roundhouse.proxy.rlwy.net:27391/railway
