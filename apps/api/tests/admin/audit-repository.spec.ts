import { describe, expect, it } from "vitest";
import { sanitizeAuditSummary } from "../../src/audit/audit.repository";

describe("audit repository", () => {
  it("removes credentials, tokens and undefined fields from summaries", () => {
    const summary = sanitizeAuditSummary({
      username: "student01",
      temporaryPassword: "four-word-temporary-passphrase",
      token: "session-token",
      nested: { refreshToken: "refresh-token", validUntil: null, skipped: undefined },
      kept: true,
      empty: undefined
    });

    expect(summary).toEqual({
      username: "student01",
      nested: { validUntil: null },
      kept: true
    });
    expect(JSON.stringify(summary)).not.toMatch(/password|token|passphrase/i);
  });
});
