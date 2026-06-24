import { migrate } from "drizzle-orm/postgres-js/migrator";
import { parseEnvironment } from "../config/env";
import { createDatabase } from "./client";

const environment = parseEnvironment(process.env);
const { db, sql } = createDatabase(environment.DATABASE_URL);

await migrate(db, { migrationsFolder: new URL("../../drizzle", import.meta.url).pathname });
await sql.end();
console.log("Database migrations applied.");
