import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const auditEvent = pgTable("audit_event", {
  id: text().primaryKey(),
  actorUserId: text().notNull().references(() => user.id, { onDelete: "restrict" }),
  targetUserId: text().references(() => user.id, { onDelete: "set null" }),
  action: text().notNull(),
  summary: jsonb().$type<Record<string, unknown>>().notNull(),
  requestId: text().notNull(),
  createdAt: timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow()
});
