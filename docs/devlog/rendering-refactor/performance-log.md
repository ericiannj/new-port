# Performance Log - Rendering Architecture Refactor

Progressive performance metrics tracking during refactor implementation.

---

## Baseline (Pre-Refactor)

**Date:** 2026-04-10
**Build:** Next.js 16.2.2 (Turbopack)
**Commit:** b4b90df

### Code Counts

| Metric | Value |
|---|---|
| Client Components (`'use client'`) | 11 |
| Framer Motion Imports | 12 |
| `next/dynamic` usage | 0 |
| `three` dependency | present (unused) |

### Build Output

> Next.js 16 with Turbopack does not display First Load JS per route in build output.
> Bundle metrics will be captured via `@next/bundle-analyzer` in Phase 4.

| Route | Status |
|---|---|
| `/` | Static |
| `/about` | Static |
| `/contact` | Static |
| `/projects` | Static |

### Lighthouse Scores

> Fill in with Lighthouse scores before starting Phase 2.

| Metric | `/` | `/about` | `/projects` | `/contact` |
|---|---|---|---|---|
| Performance Score | | | | |
| LCP | | | | |
| FCP | | | | |
| TBT | | | | |
| CLS | | | | |
| INP | | | | |
| SEO Score | | | | |

---

## After Phase 1 (Bug Fixes and Cleanup)

**Date:**
**Commit:**

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | | |
| Framer Motion Imports | | |
| `three` dependency | | |

### Notes

> (notes on what changed and expected impact)

---

## After Phase 2 (CSS Migration)

**Date:**
**Commit:**

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | | |
| Framer Motion Imports | | |

### Lighthouse Scores

| Metric | `/` | `/about` | `/projects` | `/contact` | Delta vs Baseline |
|---|---|---|---|---|---|
| Performance Score | | | | | |
| LCP | | | | | |
| FCP | | | | | |
| TBT | | | | | |
| CLS | | | | | |
| INP | | | | | |
| SEO Score | | | | | |

### Notes

> (notes on migrated components, CSS animations created, etc.)

---

## After Phase 3 (Component Composition)

**Date:**
**Commit:**

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | | |
| Framer Motion Imports | | |

### Lighthouse Scores

| Metric | `/` | `/about` | `/projects` | `/contact` | Delta vs Baseline |
|---|---|---|---|---|---|
| Performance Score | | | | | |
| LCP | | | | | |
| FCP | | | | | |
| TBT | | | | | |
| CLS | | | | | |
| INP | | | | | |
| SEO Score | | | | | |

### Notes

> (notes on composition refactors, components moved to server, etc.)

---

## After Phase 4 (FM Cleanup) + Phase 5 (Final Validation)

**Date:**
**Commit:**

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | | |
| Framer Motion Imports | | |

### Lighthouse Scores

| Metric | `/` | `/about` | `/projects` | `/contact` | Delta vs Baseline |
|---|---|---|---|---|---|
| Performance Score | | | | | |
| LCP | | | | | |
| FCP | | | | | |
| TBT | | | | | |
| CLS | | | | | |
| INP | | | | | |
| SEO Score | | | | | |

### Bundle Analysis

> `@next/bundle-analyzer` output here.

| Check | Status |
|---|---|
| Framer Motion absent from routes that don't need it | |
| No unexpected large dependencies in client bundle | |
| `three` completely removed | |

### Notes

> (final summary: what improved, what stayed the same, what was surprising)

---

## Final Comparative Summary

| Metric | Baseline | Post-Ph.1 | Post-Ph.2 | Post-Ph.3 | Post-Ph.4/5 | Target |
|---|---|---|---|---|---|---|
| Client Components | 11 | | | | | ~5-6 |
| FM Imports | 12 | | | | | ~4 |
| Perf Score (/) | | | | | | > 90 |
| LCP (/) | | | | | | < 2.5s |
| FCP (/) | | | | | | < 1.8s |
| TBT (/) | | | | | | < 200ms |
| CLS (/) | | | | | | < 0.1 |
