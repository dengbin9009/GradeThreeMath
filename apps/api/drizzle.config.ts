import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: ["./src/db/schema/auth.ts", "./src/db/schema/audit.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://math:math@127.0.0.1:5432/math"
  },
  strict: true
});
