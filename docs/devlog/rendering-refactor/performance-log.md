# Performance Log - Rendering Architecture Refactor

Progressive performance metrics tracking during refactor implementation.

> **All Lighthouse scores measured on Mobile** (Emulated Moto G Power, Slow 4G throttling, Chromium 146, Lighthouse 13.0.2).
> Incognito window used to avoid cache/IndexedDB interference.

---

## Baseline (Pre-Refactor)

**Date:** 2026-04-10
**Build:** Next.js 16.2.2 (Turbopack)
**Commit:** b4b90df

### Code Counts

| Metric | Value |
|---|---|
| Client Components (`'use client'`) | 11 (14 actual — 3 missing directives) |
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

### Lighthouse Scores (Mobile)

| Metric | `/` | `/about` | `/projects` |
|---|---|---|---|
| Performance Score | 74 | 68 | 71 |
| LCP | 7.2s | 7.9s | 7.4s |
| FCP | 0.8s | 0.8s | 0.8s |
| TBT | 160ms | 230ms | 210ms |
| CLS | 0.006 | 0.006 | 0.006 |
| Speed Index | 2.9s | 4.9s | 3.5s |
| SEO Score | 100 | 100 | 100 |

---

## After Phase 1 (Bug Fixes and Cleanup)

**Date:** 2026-04-10
**Commit:** d438d7a

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | 14 | +3 (added missing directives to DomainsSection, Stack, Summary) |
| Framer Motion Imports | 12 | 0 |
| `three` dependency | removed | -1 dep |

### Notes

> Baseline count of 11 was inaccurate — 3 components used client APIs (useState, motion) without
> the `'use client'` directive. True client component count is 14. The increase reflects a bug fix,
> not new client components. `three` dependency removed (was never imported).
> Build still produces all static routes.
> No Lighthouse re-run — Phase 1 changes (dependency removal + directive fixes) are not expected to affect scores.

---

## After Phase 2 (CSS Migration)

**Date:** 2026-04-10
**Commit:** c483a32

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | 12 | -2 (WellcomeContainer, Stack, Summary, Recommendations → server; +1 ViewTrigger) |
| Framer Motion Imports | 6 | -6 (removed from WellcomeContainer, HomeTransition, Stack, Summary, Recommendations, AnimatedBackground) |

### Lighthouse Scores (Mobile)

| Metric | `/` | `/about` | `/projects` | Delta vs Baseline |
|---|---|---|---|---|
| Performance Score | 74 | 73 | 71 | 0 / +5 / 0 |
| LCP | 7.0s | 7.3s | 7.4s | -0.2s / -0.6s / 0 |
| FCP | 0.8s | 0.8s | 0.8s | 0 / 0 / 0 |
| TBT | 180ms | 160ms | 260ms | +20ms / -70ms / +50ms |
| CLS | 0.006 | 0.006 | 0.006 | 0 / 0 / 0 |
| Speed Index | 2.1s | 3.3s | 2.1s | -0.8s / -1.6s / -1.4s |
| SEO Score | 100 | 100 | 100 | 0 / 0 / 0 |

### Notes

> Migrated 6 components from Framer Motion to CSS animations. 4 components became server components
> (WellcomeContainer, Stack, Summary, Recommendations). Created ViewTrigger for scroll-triggered animations.
> About page showed the biggest improvement (+5 perf, -70ms TBT, -1.6s SI) — expected since 3 of its
> components were migrated. Speed Index improved significantly across all pages.
> LCP remains high (~7s) across all routes — this is likely image/font related, not JS.
> TBT variance on / and /projects is within Lighthouse margin of error.
> FM still loaded on all routes because remaining 6 files (Navbar, ContactsContainer, Tooltip,
> ProjectCard, ProjectsCarousel, CustomProfileImage) still import it.

---

## After Phase 3 (Component Composition)

**Date:**
**Commit:**

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | | |
| Framer Motion Imports | | |

### Lighthouse Scores (Mobile)

| Metric | `/` | `/about` | `/projects` | Delta vs Baseline |
|---|---|---|---|---|
| Performance Score | | | | |
| LCP | | | | |
| FCP | | | | |
| TBT | | | | |
| CLS | | | | |
| Speed Index | | | | |
| SEO Score | | | | |

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

### Lighthouse Scores (Mobile)

| Metric | `/` | `/about` | `/projects` | Delta vs Baseline |
|---|---|---|---|---|
| Performance Score | | | | |
| LCP | | | | |
| FCP | | | | |
| TBT | | | | |
| CLS | | | | |
| Speed Index | | | | |
| SEO Score | | | | |

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
| Client Components | 14 | 14 | 12 | | | ~5-6 |
| FM Imports | 12 | 12 | 6 | | | ~4 |
| Perf Score (/) | 74 | — | 74 | | | > 90 |
| LCP (/) | 7.2s | — | 7.0s | | | < 2.5s |
| FCP (/) | 0.8s | — | 0.8s | | | < 1.8s |
| TBT (/) | 160ms | — | 180ms | | | < 200ms |
| CLS (/) | 0.006 | — | 0.006 | | | < 0.1 |
| Speed Index (/) | 2.9s | — | 2.1s | | | |
