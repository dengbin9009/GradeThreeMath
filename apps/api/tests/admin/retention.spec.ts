import { describe, expect, it } from "vitest";
import { getRetentionCutoffs } from "../../src/audit/retention.job";

describe("security retention", () => {
  it("uses 365 days for audit and 30 days for ended session metadata", () => {
    const now = new Date("2026-06-22T00:00:00.000Z");
    const cutoffs = getRetentionCutoffs(now);
    expect((now.getTime() - cutoffs.auditBefore.getTime()) / 86_400_000).toBe(365);
    expect((now.getTime() - cutoffs.sessionMetadataBefore.getTime()) / 86_400_000).toBe(30);
  });
});
