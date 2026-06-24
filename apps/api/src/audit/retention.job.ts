import { lt } from "drizzle-orm";
import type { MathDatabase } from "../db/client";
import { auditEvent } from "../db/schema/audit";
import { session } from "../db/schema/auth";

const DAY_MS = 86_400_000;

export function getRetentionCutoffs(now = new Date()) {
  return {
    auditBefore: new Date(now.getTime() - 365 * DAY_MS),
    sessionMetadataBefore: new Date(now.getTime() - 30 * DAY_MS)
  };
}

export async function runRetentionJob(db: MathDatabase, now = new Date()) {
  const cutoffs = getRetentionCutoffs(now);
  return db.transaction(async (tx) => {
    const removedAudit = await tx.delete(auditEvent).where(lt(auditEvent.createdAt, cutoffs.auditBefore)).returning({ id: auditEvent.id });
    const scrubbedSessions = await tx.update(session).set({ ipAddress: null, userAgent: null })
      .where(lt(session.expiresAt, cutoffs.sessionMetadataBefore))
      .returning({ id: session.id });
    return { removedAudit: removedAudit.length, scrubbedSessions: scrubbedSessions.length };
  });
}
