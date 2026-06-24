import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { auditEvent } from "./schema/audit";
import { authSchema } from "./schema/auth";

export function createDatabase(databaseUrl: string) {
  const sql = postgres(databaseUrl, { max: 10, idle_timeout: 20 });
  const db = drizzle(sql, { schema: { ...authSchema, auditEvent } });
  return { db, sql };
}

export type MathDatabase = ReturnType<typeof createDatabase>["db"];
