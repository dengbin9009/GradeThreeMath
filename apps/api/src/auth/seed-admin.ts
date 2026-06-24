import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { eq } from "drizzle-orm";
import { parseEnvironment } from "../config/env";
import { createDatabase } from "../db/client";
import { auditEvent } from "../db/schema/audit";
import { account, user } from "../db/schema/auth";
import { internalEmailForUsername, normalizeUsername } from "./internal-email";

const environment = parseEnvironment(process.env);
const username = normalizeUsername(process.env.SEED_ADMIN_USERNAME ?? "admin");
const password = process.env.SEED_ADMIN_PASSWORD;
const name = (process.env.SEED_ADMIN_NAME ?? "系统管理员").trim();
if (!password || password.length < 15) throw new Error("SEED_ADMIN_PASSWORD must contain at least 15 characters");

const { db, sql } = createDatabase(environment.DATABASE_URL);
const existing = await db.select().from(user).where(eq(user.username, username)).limit(1);

if (existing[0]) {
  if (existing[0].role !== "admin") throw new Error("Seed username exists without the admin role");
  console.log(`Admin ${username} already exists; seed skipped.`);
} else {
  const timestamp = new Date();
  const userId = `usr_${randomUUID()}`;
  const passwordHash = await hashPassword(password);
  await db.transaction(async (tx) => {
    await tx.insert(user).values({
      id: userId,
      name,
      email: internalEmailForUsername(username),
      emailVerified: true,
      username,
      displayUsername: username,
      role: "admin",
      isActive: true,
      validFrom: timestamp,
      validUntil: null,
      mustChangePassword: true,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    await tx.insert(account).values({
      id: `acc_${randomUUID()}`,
      accountId: userId,
      providerId: "credential",
      userId,
      password: passwordHash,
      createdAt: timestamp,
      updatedAt: timestamp
    });
    await tx.insert(auditEvent).values({
      id: `aud_${randomUUID()}`,
      actorUserId: userId,
      targetUserId: userId,
      action: "SEED_ADMIN",
      summary: { username },
      requestId: `seed_${randomUUID()}`,
      createdAt: timestamp
    });
  });
  console.log(`Admin ${username} created. Change the temporary password on first login.`);
}

await sql.end();
