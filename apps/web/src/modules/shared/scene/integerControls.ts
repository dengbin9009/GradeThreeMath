export interface IntegerControlBounds {
  min: number;
  max: number;
  step?: number;
}

export function normalizeIntegerControlValue(value: number, bounds: IntegerControlBounds): number {
  const min = Math.round(bounds.min);
  const max = Math.round(bounds.max);
  const step = Math.max(1, Math.round(bounds.step ?? 1));
  const rounded = Math.round(Number.isFinite(value) ? value : min);
  const snapped = min + Math.round((rounded - min) / step) * step;
  return Math.min(max, Math.max(min, snapped));
}
