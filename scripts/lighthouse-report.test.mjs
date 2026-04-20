import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyMetric } from './lighthouse-report.mjs';

test('classifyMetric: performance score', () => {
  assert.equal(classifyMetric('performance', 95), 'good');
  assert.equal(classifyMetric('performance', 90), 'good');
  assert.equal(classifyMetric('performance', 75), 'warn');
  assert.equal(classifyMetric('performance', 50), 'warn');
  assert.equal(classifyMetric('performance', 49), 'poor');
});

test('classifyMetric: LCP (lower is better, in ms)', () => {
  assert.equal(classifyMetric('lcp', 2500), 'good');
  assert.equal(classifyMetric('lcp', 2501), 'warn');
  assert.equal(classifyMetric('lcp', 4000), 'warn');
  assert.equal(classifyMetric('lcp', 4001), 'poor');
});

test('classifyMetric: CLS', () => {
  assert.equal(classifyMetric('cls', 0.1), 'good');
  assert.equal(classifyMetric('cls', 0.2), 'warn');
  assert.equal(classifyMetric('cls', 0.3), 'poor');
});

test('classifyMetric: FCP', () => {
  assert.equal(classifyMetric('fcp', 1800), 'good');
  assert.equal(classifyMetric('fcp', 2500), 'warn');
  assert.equal(classifyMetric('fcp', 3500), 'poor');
});

test('classifyMetric: TBT', () => {
  assert.equal(classifyMetric('tbt', 200), 'good');
  assert.equal(classifyMetric('tbt', 500), 'warn');
  assert.equal(classifyMetric('tbt', 800), 'poor');
});

test('classifyMetric: unknown metric throws', () => {
  assert.throws(() => classifyMetric('nonexistent', 1));
});
