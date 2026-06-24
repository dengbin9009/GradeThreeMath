import { describe, expect, it } from "vitest";
import { internalEmailForUsername, normalizeUsername } from "../../src/auth/internal-email";

describe("internal authentication email", () => {
  it("normalizes usernames and creates a stable non-deliverable address", () => {
    expect(normalizeUsername(" Student_01 ")).toBe("student_01");
    expect(internalEmailForUsername("Student_01")).toBe(internalEmailForUsername("student_01"));
    expect(internalEmailForUsername("student_01")).toMatch(/@users\.invalid$/);
  });

  it("rejects invalid usernames", () => {
    expect(() => normalizeUsername("ab")).toThrow(/3/);
    expect(() => normalizeUsername("学生一号")).toThrow(/letters/i);
  });
});
