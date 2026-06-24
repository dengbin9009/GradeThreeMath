import { bigint, boolean, integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

const utcTimestamp = () => timestamp({ withTimezone: true, mode: "date" });

export const user = pgTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().notNull().default(false),
  image: text(),
  username: text().unique(),
  displayUsername: text(),
  role: text({ enum: ["admin", "user"] }).notNull().default("user"),
  banned: boolean().notNull().default(false),
  banReason: text(),
  banExpires: utcTimestamp(),
  isActive: boolean().notNull().default(true),
  validFrom: utcTimestamp().notNull(),
  validUntil: utcTimestamp(),
  mustChangePassword: boolean().notNull().default(true),
  version: integer().notNull().default(1),
  createdAt: utcTimestamp().notNull().defaultNow(),
  updatedAt: utcTimestamp().notNull().defaultNow()
});

export const session = pgTable("session", {
  id: text().primaryKey(),
  expiresAt: utcTimestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: utcTimestamp().notNull().defaultNow(),
  updatedAt: utcTimestamp().notNull().defaultNow(),
  ipAddress: text(),
  userAgent: text(),
  userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text()
});

export const account = pgTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text().notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: utcTimestamp(),
  refreshTokenExpiresAt: utcTimestamp(),
  scope: text(),
  password: text(),
  createdAt: utcTimestamp().notNull().defaultNow(),
  updatedAt: utcTimestamp().notNull().defaultNow()
});

export const verification = pgTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: utcTimestamp().notNull(),
  createdAt: utcTimestamp().notNull().defaultNow(),
  updatedAt: utcTimestamp().notNull().defaultNow()
});

export const rateLimit = pgTable("rate_limit", {
  id: text().notNull().default(""),
  key: text().notNull(),
  bucket: text().notNull().default("better-auth"),
  count: integer().notNull().default(0),
  lastRequest: bigint({ mode: "number" }).notNull().default(0),
  windowStartedAt: utcTimestamp().notNull().defaultNow(),
  expiresAt: utcTimestamp().notNull().defaultNow()
}, (table) => [primaryKey({ columns: [table.key, table.bucket] })]);

export const authSchema = { user, session, account, verification, rateLimit };
