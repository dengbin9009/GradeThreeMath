import { randomUUID } from "node:crypto";
import type { AppUser } from "../auth/account-policy";
import { internalEmailForUsername, normalizeUsername } from "../auth/internal-email";

export type AuditAction = "CREATE_USER" | "UPDATE_USER" | "RESET_PASSWORD" | "REVOKE_SESSIONS" | "CHANGE_PASSWORD";

export interface ManagedUser extends AppUser {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditEvent {
  id: string;
  actorUserId: string;
  targetUserId: string;
  action: AuditAction;
  summary: Record<string, unknown>;
  createdAt: Date;
}

export interface CreateUserInput {
  username: string;
  displayName: string;
  temporaryPassword: string;
  validFrom: Date;
  validUntil: Date | null;
}

export interface UpdateUserInput {
  displayName?: string;
  isActive?: boolean;
  validFrom?: Date;
  validUntil?: Date | null;
  version: number;
}

export interface AdminUsersPort {
  createUser(actorUserId: string, input: CreateUserInput): Promise<ManagedUser>;
  getUser(userId: string): Promise<ManagedUser>;
  listUsers(): Promise<ManagedUser[]>;
  updateUser(actorUserId: string, userId: string, input: UpdateUserInput): Promise<ManagedUser>;
  resetPassword(actorUserId: string, userId: string, temporaryPassword: string, version: number): Promise<ManagedUser>;
  revokeSessions(actorUserId: string, userId: string): Promise<void>;
  listAuditEvents(userId: string): Promise<AuditEvent[]>;
}

export class InMemoryAdminRepository {
  readonly users = new Map<string, ManagedUser>();
  readonly auditEvents: AuditEvent[] = [];
  readonly sessionUserIds = new Map<string, string>();
  private shouldFailAudit = false;

  failNextAudit() {
    this.shouldFailAudit = true;
  }

  async transaction<T>(operation: () => Promise<T> | T): Promise<T> {
    const usersSnapshot = structuredClone(this.users);
    const auditSnapshot = structuredClone(this.auditEvents);
    const sessionsSnapshot = structuredClone(this.sessionUserIds);
    try {
      return await operation();
    } catch (error) {
      this.users.clear();
      for (const [key, value] of usersSnapshot) this.users.set(key, value);
      this.auditEvents.splice(0, this.auditEvents.length, ...auditSnapshot);
      this.sessionUserIds.clear();
      for (const [key, value] of sessionsSnapshot) this.sessionUserIds.set(key, value);
      throw new Error("Admin operation rolled back", { cause: error });
    }
  }

  insertAudit(event: AuditEvent) {
    if (this.shouldFailAudit) {
      this.shouldFailAudit = false;
      throw new Error("Injected audit failure");
    }
    this.auditEvents.push(event);
  }

  revokeSessions(userId: string) {
    for (const [sessionId, ownerId] of this.sessionUserIds) {
      if (ownerId === userId) this.sessionUserIds.delete(sessionId);
    }
  }
}

export class AdminUserService implements AdminUsersPort {
  constructor(
    private readonly repository: InMemoryAdminRepository,
    private readonly now: () => Date = () => new Date()
  ) {}

  async createUser(actorUserId: string, input: CreateUserInput): Promise<ManagedUser> {
    return this.repository.transaction(() => {
      const username = normalizeUsername(input.username);
      if (input.temporaryPassword.length < 15) throw new Error("Temporary password must contain at least 15 characters");
      if (input.validUntil && input.validUntil.getTime() <= input.validFrom.getTime()) throw new Error("validUntil must be later than validFrom");
      if ([...this.repository.users.values()].some((user) => user.username === username)) throw new Error("USERNAME_CONFLICT");
      const timestamp = this.now();
      const user: ManagedUser = {
        id: `usr_${randomUUID()}`,
        username,
        displayName: input.displayName.trim(),
        email: internalEmailForUsername(username),
        role: "user",
        isActive: true,
        validFrom: input.validFrom,
        validUntil: input.validUntil,
        mustChangePassword: true,
        version: 1,
        createdAt: timestamp,
        updatedAt: timestamp
      };
      if (!user.displayName) throw new Error("Display name is required");
      this.repository.users.set(user.id, user);
      this.repository.insertAudit({
        id: `aud_${randomUUID()}`,
        actorUserId,
        targetUserId: user.id,
        action: "CREATE_USER",
        summary: { username, displayName: user.displayName, validFrom: user.validFrom, validUntil: user.validUntil },
        createdAt: timestamp
      });
      return structuredClone(user);
    });
  }

  async getUser(userId: string): Promise<ManagedUser> {
    const user = this.repository.users.get(userId);
    if (!user) throw new Error("USER_NOT_FOUND");
    return structuredClone(user);
  }

  async listUsers(): Promise<ManagedUser[]> {
    return [...this.repository.users.values()].map((user) => structuredClone(user));
  }

  async updateUser(actorUserId: string, userId: string, input: UpdateUserInput): Promise<ManagedUser> {
    return this.repository.transaction(() => {
      const existing = this.repository.users.get(userId);
      if (!existing) throw new Error("USER_NOT_FOUND");
      if (existing.version !== input.version) throw new Error("USER_VERSION_CONFLICT");
      const next: ManagedUser = {
        ...existing,
        ...(input.displayName === undefined ? {} : { displayName: input.displayName.trim() }),
        ...(input.isActive === undefined ? {} : { isActive: input.isActive }),
        ...(input.validFrom === undefined ? {} : { validFrom: input.validFrom }),
        ...(input.validUntil === undefined ? {} : { validUntil: input.validUntil }),
        version: existing.version + 1,
        updatedAt: this.now()
      };
      if (next.validUntil && next.validUntil.getTime() <= next.validFrom.getTime()) throw new Error("INVALID_VALIDITY_RANGE");
      const narrowsAccess = !next.isActive || next.validFrom.getTime() > existing.validFrom.getTime()
        || (next.validUntil !== null && (existing.validUntil === null || next.validUntil.getTime() < existing.validUntil.getTime()));
      this.repository.users.set(userId, next);
      if (narrowsAccess) this.repository.revokeSessions(userId);
      this.repository.insertAudit({
        id: `aud_${randomUUID()}`,
        actorUserId,
        targetUserId: userId,
        action: "UPDATE_USER",
        summary: { displayName: next.displayName, isActive: next.isActive, validFrom: next.validFrom, validUntil: next.validUntil },
        createdAt: this.now()
      });
      return structuredClone(next);
    });
  }

  async resetPassword(actorUserId: string, userId: string, temporaryPassword: string, version: number): Promise<ManagedUser> {
    return this.repository.transaction(() => {
      if (temporaryPassword.length < 15) throw new Error("Temporary password must contain at least 15 characters");
      const existing = this.repository.users.get(userId);
      if (!existing) throw new Error("USER_NOT_FOUND");
      if (existing.version !== version) throw new Error("USER_VERSION_CONFLICT");
      const updated = { ...existing, mustChangePassword: true, version: existing.version + 1, updatedAt: this.now() };
      this.repository.users.set(userId, updated);
      this.repository.revokeSessions(userId);
      this.repository.insertAudit({ id: `aud_${randomUUID()}`, actorUserId, targetUserId: userId, action: "RESET_PASSWORD", summary: { mustChangePassword: true, sessionsRevoked: true }, createdAt: this.now() });
      return structuredClone(updated);
    });
  }

  async revokeSessions(actorUserId: string, userId: string): Promise<void> {
    await this.repository.transaction(() => {
      if (!this.repository.users.has(userId)) throw new Error("USER_NOT_FOUND");
      this.repository.revokeSessions(userId);
      this.repository.insertAudit({ id: `aud_${randomUUID()}`, actorUserId, targetUserId: userId, action: "REVOKE_SESSIONS", summary: { sessionsRevoked: true }, createdAt: this.now() });
    });
  }

  async listAuditEvents(userId: string): Promise<AuditEvent[]> {
    if (!this.repository.users.has(userId)) throw new Error("USER_NOT_FOUND");
    return this.repository.auditEvents.filter((event) => event.targetUserId === userId).slice().reverse().map((event) => structuredClone(event));
  }
}
