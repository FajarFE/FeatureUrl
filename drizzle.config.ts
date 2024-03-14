// import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "USER",
    password: process.env.DB_PASSWORD ?? "PASSWORD123",
    database: process.env.DB_NAME ?? "shortlink",
    ssl: true,
  },
} satisfies Config;
