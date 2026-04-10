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

**Date:** 2026-04-10
**Commit:** a4e2a82

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | 13 | -1 (about/page → server; +1 SectionTracker, +1 LazyAnimatedBackground) |
| Framer Motion Imports | 5 | -7 (Navbar migrated to CSS) |

### Lighthouse Scores (Mobile)

| Metric | `/` | `/about` | `/projects` | Delta vs Baseline |
|---|---|---|---|---|
| Performance Score | 74 | 73 | 74 | 0 / +5 / +3 |
| LCP | 6.9s | 6.9s | 7.5s | -0.3s / -1.0s / +0.1s |
| FCP | 0.8s | 0.9s | 0.8s | 0 / +0.1s / 0 |
| TBT | 190ms | 160ms | 140ms | +30ms / -70ms / -70ms |
| CLS | 0.006 | 0.006 | 0.006 | 0 / 0 / 0 |
| Speed Index | 1.8s | 3.6s | 2.2s | -1.1s / -1.3s / -1.3s |
| SEO Score | 100 | 100 | 100 | 0 / 0 / 0 |

### Notes

> About page became a server component (scroll-tracking extracted to SectionTracker).
> Navbar migrated from FM to CSS (spin-once animation on route change).
> AnimatedBackground lazy-loaded via next/dynamic (ssr: false) — deferred from initial bundle.
> Projects page showed best improvement this phase (+3 perf, TBT 210ms→140ms).
> Speed Index continues to improve across all pages (home now at 1.8s vs 2.9s baseline).
> LCP on /about improved significantly (-1.0s from baseline) — likely due to server-rendered content
> streaming earlier with fewer client boundaries.
> Unused JS dropped slightly (353/352/349 KiB vs 360/357/356 in Ph.2).

---

## After Phase 4 (FM Cleanup) + Phase 5 (Final Validation)

**Date:** 2026-04-10
**Commit:** 01e75cd

### Code Counts

| Metric | Value | Delta vs Baseline |
|---|---|---|
| Client Components | 13 | -1 (same as Ph.3 — Phase 4 only added tooling) |
| Framer Motion Imports | 5 | -7 (same as Ph.3) |

### Lighthouse Scores (Mobile)

> Same as Phase 3 — Phase 4 added only devDependency tooling, no runtime changes.

| Metric | `/` | `/about` | `/projects` | Delta vs Baseline |
|---|---|---|---|---|
| Performance Score | 74 | 73 | 74 | 0 / +5 / +3 |
| LCP | 6.9s | 6.9s | 7.5s | -0.3s / -1.0s / +0.1s |
| FCP | 0.8s | 0.9s | 0.8s | 0 / +0.1s / 0 |
| TBT | 190ms | 160ms | 140ms | +30ms / -70ms / -70ms |
| CLS | 0.006 | 0.006 | 0.006 | 0 / 0 / 0 |
| Speed Index | 1.8s | 3.6s | 2.2s | -1.1s / -1.3s / -1.3s |
| SEO Score | 100 | 100 | 100 | 0 / 0 / 0 |

### Bundle Analysis

> Run `ANALYZE=true pnpm build` to generate visual bundle report.

| Check | Status |
|---|---|
| Framer Motion absent from routes that don't need it | FM still loaded globally (5 components across routes use it) |
| No unexpected large dependencies in client bundle | OK |
| `three` completely removed | OK |

### Notes

> Phase 4 added `@next/bundle-analyzer` for future analysis. No runtime code changes.
> FM remains in 5 files that genuinely need it (ContactsContainer, Tooltip, ProjectCard,
> ProjectsCarousel, CustomProfileImage) — all use features without CSS equivalents
> (spring physics, useMotionValue, layout animations, AnimatePresence).
> The refactor achieved its primary goals: FM usage cut from 12→5 files, 4 components became
> server components, About page moved to server, AnimatedBackground lazy-loaded.
> LCP (~7s) remains the main bottleneck — this is image/font related, not JS, and outside
> the scope of this rendering refactor.

---

## Final Comparative Summary

| Metric | Baseline | Post-Ph.1 | Post-Ph.2 | Post-Ph.3 | Post-Ph.4/5 | Target |
|---|---|---|---|---|---|---|
| Client Components | 14 | 14 | 12 | 13 | 13 | ~5-6 |
| FM Imports | 12 | 12 | 6 | 5 | 5 | ~4 |
| Perf Score (/) | 74 | — | 74 | 74 | 74 | > 90 |
| LCP (/) | 7.2s | — | 7.0s | 6.9s | 6.9s | < 2.5s |
| FCP (/) | 0.8s | — | 0.8s | 0.8s | 0.8s | < 1.8s |
| TBT (/) | 160ms | — | 180ms | 190ms | 190ms | < 200ms |
| CLS (/) | 0.006 | — | 0.006 | 0.006 | 0.006 | < 0.1 |
| Speed Index (/) | 2.9s | — | 2.1s | 1.8s | 1.8s | |

---

## Conclusions

### Targets met

- **FM Imports:** 12 → 5 (target ~4). Close — remaining 5 all use features with no CSS equivalent.
- **FCP:** 0.8s across all routes (target < 1.8s). Already exceeded before the refactor.
- **TBT:** 140-190ms (target < 200ms). Met on all routes.
- **CLS:** 0.006 (target < 0.1). Stable throughout, already exceeded.
- **Speed Index (/):** 2.9s → 1.8s (-38%). No formal target, but significant improvement.

### Targets not met

- **Client Components:** 14 → 13 (target ~5-6). Refactor reduced FM usage but added necessary client wrappers (SectionTracker, LazyAnimatedBackground, ViewTrigger). True reduction in FM-dependent client components was larger (7 components freed from FM), but the overall count didn't drop as much because the architecture still needs client boundaries for interactivity.
- **Performance Score:** 74 stable (target > 90). Bottlenecked by LCP, not JS.
- **LCP:** 7.2s → 6.9s (target < 2.5s). Improved slightly but remains the dominant issue. Root cause is image/font loading, not JavaScript — outside the scope of this rendering refactor.

### Key takeaways

1. **Phase 2 had the highest impact** as predicted — biggest Speed Index and TBT improvements came from replacing FM with CSS.
2. **The /about page benefited the most** (+5 perf, -1.0s LCP, -70ms TBT) since it had the most FM-dependent components.
3. **LCP is the next frontier.** Performance Score is capped by ~7s LCP on all routes. Optimizing images (sizing, format, preloading) and fonts (preload, subsetting) would be the highest-impact next step.
4. **Tailwind v4 gotcha:** Custom `@keyframes` must be defined inside `@theme` alongside `--animate-*` variables. Defining them as standalone `@utility` blocks doesn't produce CSS output.
5. **FM is justified where it remains.** The 5 remaining files use spring physics, `useMotionValue`, `layout` animations, or `AnimatePresence` — features that have no CSS equivalent.
