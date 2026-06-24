import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { and, eq } from "drizzle-orm";
import { AuditRepository } from "../audit/audit.repository";
import type { MathDatabase } from "../db/client";
import { account, session, user } from "../db/schema/auth";
import { internalEmailForUsername, normalizeUsername } from "../auth/internal-email";
import type { AdminUsersPort, AuditEvent, CreateUserInput, ManagedUser, UpdateUserInput } from "./users.service";

function toManagedUser(row: typeof user.$inferSelect): ManagedUser {
  return {
    id: row.id,
    username: row.username ?? "",
    displayName: row.name,
    email: row.email,
    role: row.role,
    isActive: row.isActive,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
    mustChangePassword: row.mustChangePassword,
    version: row.version,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  };
}

export class DrizzleAdminUserService implements AdminUsersPort {
  constructor(private readonly db: MathDatabase, private readonly now: () => Date = () => new Date()) {}

  async createUser(actorUserId: string, input: CreateUserInput): Promise<ManagedUser> {
    const username = normalizeUsername(input.username);
    if (input.temporaryPassword.length < 15) throw new Error("Temporary password must contain at least 15 characters");
    if (input.validUntil && input.validUntil <= input.validFrom) throw new Error("INVALID_VALIDITY_RANGE");
    const password = await hashPassword(input.temporaryPassword);
    return this.db.transaction(async (tx) => {
      const duplicate = await tx.select({ id: user.id }).from(user).where(eq(user.username, username)).limit(1);
      if (duplicate.length) throw new Error("USERNAME_CONFLICT");
      const timestamp = this.now();
      const userId = `usr_${randomUUID()}`;
      const [created] = await tx.insert(user).values({
        id: userId,
        name: input.displayName.trim(),
        email: internalEmailForUsername(username),
        emailVerified: true,
        username,
        displayUsername: input.username.trim(),
        role: "user",
        isActive: true,
        validFrom: input.validFrom,
        validUntil: input.validUntil,
        mustChangePassword: true,
        version: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      }).returning();
      if (!created) throw new Error("USER_CREATE_FAILED");
      await tx.insert(account).values({
        id: `acc_${randomUUID()}`,
        accountId: userId,
        providerId: "credential",
        userId,
        password,
        createdAt: timestamp,
        updatedAt: timestamp
      });
      await new AuditRepository(tx, this.now).record({
        actorUserId,
        targetUserId: userId,
        action: "CREATE_USER",
        summary: { username, displayName: created.name, validFrom: created.validFrom, validUntil: created.validUntil },
        createdAt: timestamp
      });
      return toManagedUser(created);
    });
  }

  async getUser(userId: string): Promise<ManagedUser> {
    const [row] = await this.db.select().from(user).where(eq(user.id, userId)).limit(1);
    if (!row) throw new Error("USER_NOT_FOUND");
    return toManagedUser(row);
  }

  async listUsers(): Promise<ManagedUser[]> {
    const rows = await this.db.select().from(user);
    return rows.map(toManagedUser);
  }

  async updateUser(actorUserId: string, userId: string, input: UpdateUserInput): Promise<ManagedUser> {
    return this.db.transaction(async (tx) => {
      const [existing] = await tx.select().from(user).where(eq(user.id, userId)).limit(1);
      if (!existing) throw new Error("USER_NOT_FOUND");
      if (existing.version !== input.version) throw new Error("USER_VERSION_CONFLICT");
      const validFrom = input.validFrom ?? existing.validFrom;
      const validUntil = input.validUntil === undefined ? existing.validUntil : input.validUntil;
      if (validUntil && validUntil <= validFrom) throw new Error("INVALID_VALIDITY_RANGE");
      const timestamp = this.now();
      const [updated] = await tx.update(user).set({
        ...(input.displayName === undefined ? {} : { name: input.displayName.trim() }),
        ...(input.isActive === undefined ? {} : { isActive: input.isActive }),
        validFrom,
        validUntil,
        version: existing.version + 1,
        updatedAt: timestamp
      }).where(and(eq(user.id, userId), eq(user.version, input.version))).returning();
      if (!updated) throw new Error("USER_VERSION_CONFLICT");
      const narrowsAccess = !updated.isActive || validFrom > existing.validFrom
        || (validUntil !== null && (existing.validUntil === null || validUntil < existing.validUntil));
      if (narrowsAccess) await tx.delete(session).where(eq(session.userId, userId));
      await new AuditRepository(tx, this.now).record({
        actorUserId,
        targetUserId: userId,
        action: "UPDATE_USER",
        summary: { displayName: updated.name, isActive: updated.isActive, validFrom, validUntil },
        createdAt: timestamp
      });
      return toManagedUser(updated);
    });
  }

  async resetPassword(actorUserId: string, userId: string, temporaryPassword: string, version: number): Promise<ManagedUser> {
    if (temporaryPassword.length < 15) throw new Error("Temporary password must contain at least 15 characters");
    const password = await hashPassword(temporaryPassword);
    return this.db.transaction(async (tx) => {
      const [existing] = await tx.select().from(user).where(eq(user.id, userId)).limit(1);
      if (!existing) throw new Error("USER_NOT_FOUND");
      if (existing.version !== version) throw new Error("USER_VERSION_CONFLICT");
      const timestamp = this.now();
      await tx.update(account).set({ password, updatedAt: timestamp }).where(and(eq(account.userId, userId), eq(account.providerId, "credential")));
      const [updated] = await tx.update(user).set({ mustChangePassword: true, version: existing.version + 1, updatedAt: timestamp }).where(and(eq(user.id, userId), eq(user.version, version))).returning();
      if (!updated) throw new Error("USER_VERSION_CONFLICT");
      await tx.delete(session).where(eq(session.userId, userId));
      await new AuditRepository(tx, this.now).record({ actorUserId, targetUserId: userId, action: "RESET_PASSWORD", summary: { mustChangePassword: true, sessionsRevoked: true }, createdAt: timestamp });
      return toManagedUser(updated);
    });
  }

  async revokeSessions(actorUserId: string, userId: string): Promise<void> {
    await this.db.transaction(async (tx) => {
      const [existing] = await tx.select({ id: user.id }).from(user).where(eq(user.id, userId)).limit(1);
      if (!existing) throw new Error("USER_NOT_FOUND");
      await tx.delete(session).where(eq(session.userId, userId));
      await new AuditRepository(tx, this.now).record({ actorUserId, targetUserId: userId, action: "REVOKE_SESSIONS", summary: { sessionsRevoked: true } });
    });
  }

  async listAuditEvents(userId: string): Promise<AuditEvent[]> {
    return new AuditRepository(this.db, this.now).listForTarget(userId);
  }
}
