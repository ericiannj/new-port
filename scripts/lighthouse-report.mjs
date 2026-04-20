const THRESHOLDS = {
  performance: { good: 90, warn: 50 },
  lcp: { good: 2500, warn: 4000 },
  cls: { good: 0.1, warn: 0.25 },
  fcp: { good: 1800, warn: 3000 },
  tbt: { good: 200, warn: 600 },
};

export function classifyMetric(name, value) {
  const t = THRESHOLDS[name];
  if (!t) throw new Error(`Unknown metric: ${name}`);

  if (name === 'performance') {
    if (value >= t.good) return 'good';
    if (value >= t.warn) return 'warn';
    return 'poor';
  }

  if (value <= t.good) return 'good';
  if (value <= t.warn) return 'warn';
  return 'poor';
}
