import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";
import * as schema from "./src/schema.js";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

// Use DATABASE_URL on Railway/Cloud, or fall back to individual DB_* parameters locally
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    })
  : new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 5432,
      ssl: false,
    });

pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err);
});

export const db = drizzle(pool, { schema });

export default pool;
