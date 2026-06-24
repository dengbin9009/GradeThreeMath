import { describe, expect, it } from "vitest";
import { assertInteger, exactDivision, normalizeIntegerRange } from "../../src/domain/shared/integer";

describe("integer domain guard", () => {
  it("accepts finite integers and rejects fractions", () => {
    expect(assertInteger(12, "count")).toBe(12);
    expect(() => assertInteger(1.5, "count")).toThrow(/count.*integer/i);
    expect(() => assertInteger(Number.NaN, "count")).toThrow(/count.*integer/i);
  });

  it("normalizes values to an integer range", () => {
    expect(normalizeIntegerRange(13.8, { min: 2, max: 12 })).toBe(12);
    expect(normalizeIntegerRange(-4, { min: 2, max: 12 })).toBe(2);
    expect(normalizeIntegerRange(7.2, { min: 2, max: 12 })).toBe(7);
  });

  it("only permits exact division", () => {
    expect(exactDivision(84, 7)).toBe(12);
    expect(() => exactDivision(10, 3)).toThrow(/whole-number/i);
    expect(() => exactDivision(10, 0)).toThrow(/zero/i);
  });
});
