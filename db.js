import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo_app",
  password: "12345678",
  port: 5432,
});

export const db = drizzle(pool);

pool.query("SELECT NOW()", (error) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("Database connected!");
  }
});

export default pool;
