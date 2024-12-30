
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schemaFilter: ["public"],
  schema: "./src/db/schema.ts",
  out: "/supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres.zxdbubaekjohbwcgdsjw:A0dab8745f9@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
  },
});
