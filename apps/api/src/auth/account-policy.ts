export type UserRole = "admin" | "user";
export type AccountStatus = "pending" | "active" | "expiring-soon" | "expired" | "suspended";

export interface AppUser {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  isActive: boolean;
  validFrom: Date;
  validUntil: Date | null;
  mustChangePassword: boolean;
  version: number;
}

export interface AppSession {
  id: string;
  expiresAt: Date;
  updatedAt?: Date;
}

export interface ResolvedSession {
  user: AppUser;
  session: AppSession;
}

const EXPIRING_SOON_MS = 7 * 24 * 60 * 60 * 1000;

export function getAccountStatus(user: AppUser, now = new Date()): AccountStatus {
  if (!user.isActive) return "suspended";
  if (now.getTime() < user.validFrom.getTime()) return "pending";
  if (user.validUntil && now.getTime() >= user.validUntil.getTime()) return "expired";
  if (user.validUntil && user.validUntil.getTime() - now.getTime() <= EXPIRING_SOON_MS) return "expiring-soon";
  return "active";
}

export function evaluateAccountAccess(user: AppUser, now = new Date()) {
  const status = getAccountStatus(user, now);
  return { allowed: status === "active" || status === "expiring-soon", status } as const;
}

export function evaluateSessionAccess(resolved: ResolvedSession | null, now = new Date()) {
  if (!resolved) return { allowed: false, code: "AUTH_REQUIRED" } as const;
  if (now.getTime() >= resolved.session.expiresAt.getTime()) return { allowed: false, code: "AUTH_SESSION_EXPIRED" } as const;
  if (resolved.session.updatedAt && now.getTime() - resolved.session.updatedAt.getTime() >= 2 * 60 * 60 * 1000) {
    return { allowed: false, code: "AUTH_SESSION_IDLE" } as const;
  }
  const account = evaluateAccountAccess(resolved.user, now);
  if (!account.allowed) return { allowed: false, code: "AUTH_ACCOUNT_UNAVAILABLE" } as const;
  return { allowed: true, code: "AUTH_OK" } as const;
}
