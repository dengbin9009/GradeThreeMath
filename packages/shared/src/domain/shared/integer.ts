export interface IntegerRange {
  min: number;
  max: number;
}

export function assertInteger(value: number, name = "value"): number {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new Error(`${name} must be a finite integer`);
  }
  return value;
}

export function normalizeIntegerRange(value: number, range: IntegerRange): number {
  const min = assertInteger(range.min, "min");
  const max = assertInteger(range.max, "max");
  if (min > max) throw new Error("min must not exceed max");
  const rounded = Math.round(value);
  return Math.min(max, Math.max(min, rounded));
}

export function exactDivision(dividend: number, divisor: number): number {
  assertInteger(dividend, "dividend");
  assertInteger(divisor, "divisor");
  if (divisor === 0) throw new Error("divisor must not be zero");
  if (dividend % divisor !== 0) throw new Error("division must have a whole-number result");
  return dividend / divisor;
}
