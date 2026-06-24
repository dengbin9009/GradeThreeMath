import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import type { AuditAction, AuditEvent } from "../admin/users.service";
import type { MathDatabase } from "../db/client";
import { auditEvent } from "../db/schema/audit";

type AuditDatabase = MathDatabase | Parameters<Parameters<MathDatabase["transaction"]>[0]>[0];

const sensitiveKey = /(password|token|secret|credential|cookie|session)/i;

export interface AuditWriteInput {
  actorUserId: string;
  targetUserId: string | null;
  action: AuditAction;
  summary: Record<string, unknown>;
  requestId?: string;
  createdAt?: Date;
}

export function sanitizeAuditSummary(summary: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(summary).flatMap(([key, value]) => {
    if (value === undefined || sensitiveKey.test(key)) return [];
    if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date)) {
      return [[key, sanitizeAuditSummary(value as Record<string, unknown>)]];
    }
    return [[key, value]];
  }));
}

export class AuditRepository {
  constructor(private readonly db: AuditDatabase, private readonly now: () => Date = () => new Date()) {}

  async record(input: AuditWriteInput): Promise<void> {
    await this.db.insert(auditEvent).values({
      id: `aud_${randomUUID()}`,
      actorUserId: input.actorUserId,
      targetUserId: input.targetUserId,
      action: input.action,
      summary: sanitizeAuditSummary(input.summary),
      requestId: input.requestId ?? `req_${randomUUID()}`,
      createdAt: input.createdAt ?? this.now()
    });
  }

  async listForTarget(targetUserId: string, limit = 100): Promise<AuditEvent[]> {
    const rows = await this.db.select().from(auditEvent).where(eq(auditEvent.targetUserId, targetUserId)).orderBy(desc(auditEvent.createdAt)).limit(limit);
    return rows.map((row) => ({
      id: row.id,
      actorUserId: row.actorUserId,
      targetUserId: row.targetUserId ?? targetUserId,
      action: row.action as AuditAction,
      summary: row.summary,
      createdAt: row.createdAt
    }));
  }
}
