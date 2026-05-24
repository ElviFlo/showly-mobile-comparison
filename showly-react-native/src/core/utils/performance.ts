export function now(): number {
  return globalThis.performance?.now?.() ?? Date.now();
}

export function roundMetric(value: number): number {
  return Math.round(value * 100) / 100;
}