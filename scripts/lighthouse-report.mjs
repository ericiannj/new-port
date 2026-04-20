import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

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

export function extractMetrics(report) {
  const score = report.categories?.performance?.score ?? 0;
  const audit = (key) => report.audits?.[key]?.numericValue ?? null;

  return {
    performance: Math.round(score * 100),
    lcp: audit('largest-contentful-paint'),
    cls: audit('cumulative-layout-shift'),
    fcp: audit('first-contentful-paint'),
    tbt: audit('total-blocking-time'),
  };
}

const REPORT_PATTERN = /^lighthouse-(mobile|desktop)-(.+)\.json$/;

export async function parseReports(dir) {
  const entries = await readdir(dir);
  const results = [];

  for (const entry of entries) {
    const match = entry.match(REPORT_PATTERN);
    if (!match) continue;
    const [, preset, route] = match;

    const contents = await readFile(join(dir, entry), 'utf8');
    const report = JSON.parse(contents);

    results.push({ preset, route, metrics: extractMetrics(report) });
  }

  return results;
}
