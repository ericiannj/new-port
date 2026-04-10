# Rendering Architecture Refactor Plan

## Goal

Shift the portfolio from a heavily client-side rendering model to a **server-first architecture** with minimal client-side JavaScript. This improves performance, SEO, and user experience on low-powered devices.

## Current State

- **11 client components**, mostly due to Framer Motion (12 files use it)
- The root layout imports 4 client components (`AnimatedBackground`, `ContactsContainer`, `TransitionWrapper`, `Navbar`), making the entire app shell client-rendered
- `three` is listed as a dependency but never imported
- 3 components have incorrect `'use client'` usage (missing or misplaced)
- No `next/dynamic` usage anywhere

## Target State

- Framer Motion usage reduced from 12 files to ~3-4 (only for complex interactions)
- Simple animations handled by CSS (zero JS)
- `'use client'` pushed to the lowest possible level in the component tree
- Heavy decorative components lazy-loaded
- Measurably smaller JS bundle per route

---

## Phase 1: Bug Fixes and Cleanup

**Priority: High | Risk: Low**

### 1.1 Remove unused `three` dependency

```bash
pnpm remove three
```

Remove `@types/three` too if present.

### 1.2 Fix missing `'use client'` directives

Add `'use client'` to the top of:

- `src/app/about/components/DomainsSection.tsx` — uses `useState` without the directive (runtime bug)
- `src/app/about/components/Stack.tsx` — uses `motion.*` components
- `src/app/about/components/Summary.tsx` — uses `motion.*` components

### 1.3 Baseline measurement

> **IMPORTANT — Measure Before You Change Anything**
>
> The entire value of this refactor is only provable through **before vs. after comparison**.
> Before starting Phase 2, you MUST capture a full baseline of every metric listed below.
> Without this baseline, there is no way to know whether the refactor actually improved
> performance or just changed the code. Save the results in a file (e.g., `docs/metrics-baseline.md`)
> and re-measure after each phase to track progressive improvement.

**How to capture the baseline:**

1. Run `pnpm build` and record the **First Load JS** per route from the build output
2. Run Lighthouse (Chrome DevTools > Lighthouse) on `/`, `/about`, `/projects` and record all scores
3. Optionally run PageSpeed Insights for real-world CrUX data

**Metrics to record:**

| Metric | What it measures | Tool |
|---|---|---|
| **First Load JS (per route)** | Total JS sent to the browser on first visit | `pnpm build` output |
| **LCP** (Largest Contentful Paint) | Time until the largest visible element renders | Lighthouse |
| **FCP** (First Contentful Paint) | Time until the first content appears | Lighthouse |
| **TBT** (Total Blocking Time) | Time JS blocks the main thread | Lighthouse |
| **CLS** (Cumulative Layout Shift) | Visual stability — elements shifting unexpectedly | Lighthouse |
| **INP** (Interaction to Next Paint) | Responsiveness to user interactions | Lighthouse / PageSpeed Insights |
| **Performance Score** | Overall Lighthouse performance rating | Lighthouse |
| **SEO Score** | Search engine optimization audit | Lighthouse |
| **Client Components Count** | Number of files with `'use client'` | `grep -r "use client" src --include="*.tsx" \| wc -l` |
| **Framer Motion Imports** | Number of files importing framer-motion | `grep -r "framer-motion" src --include="*.tsx" \| wc -l` |

---

## Performance Tracking: What to Expect After Each Phase

> Re-measure all metrics after completing each phase. Use the table below to know
> which indicators should improve at each step. If a metric that should improve
> does not, investigate before moving to the next phase.

| Metric | After Phase 1 | After Phase 2 | After Phase 3 | After Phase 4 |
|---|---|---|---|---|
| **First Load JS** | Slight drop (three.js removed) | **Significant drop** — FM removed from ~8 files | **Further drop** — fewer client boundaries | Marginal drop — tree-shaking cleanup |
| **LCP** | No change | Faster — less JS to parse before paint | Faster — server-rendered content streams earlier | No change |
| **FCP** | No change | **Faster** — less JS blocking first paint | **Faster** — more HTML arrives server-rendered | No change |
| **TBT** | Slight improvement | **Major improvement** — much less JS executing | Further improvement — fewer hydration boundaries | Marginal improvement |
| **CLS** | May improve (bug fixes) | Should stay stable or improve | Should stay stable | No change |
| **INP** | No change | No change | No change | No change |
| **Performance Score** | Slight improvement | **Notable improvement** (5-15 pts expected) | **Further improvement** (5-10 pts expected) | Marginal |
| **SEO Score** | No change | No change | May improve (more SSR content) | No change |
| **Client Components** | Same (11) — bugs fixed, not removed | **Down to ~6-7** | **Down to ~5-6** | Same as Phase 3 |
| **FM Imports** | Same (12) | **Down to ~4-5** | Same as Phase 2 | Confirmed ~4 (verified via bundle analyzer) |

**Reading the table:**
- **Bold** entries are the phases where that metric should show the most visible improvement
- "No change" means the phase doesn't target that metric — if it regresses, something went wrong
- Phase 2 is the highest-impact phase for almost every metric
- Phase 3 compounds the gains from Phase 2 by moving more rendering to the server
- Phase 4 is a cleanup pass — expect small refinements, not dramatic changes

**Suggested tracking format** (save to `docs/metrics-tracking.md`):

```markdown
| Metric               | Baseline | After Ph.1 | After Ph.2 | After Ph.3 | After Ph.4 | Target   |
|----------------------|----------|------------|------------|------------|------------|----------|
| First Load JS (/)    |          |            |            |            |            |          |
| First Load JS (/about) |       |            |            |            |            |          |
| First Load JS (/projects) |    |            |            |            |            |          |
| LCP                  |          |            |            |            |            | < 2.5s   |
| FCP                  |          |            |            |            |            | < 1.8s   |
| TBT                  |          |            |            |            |            | < 200ms  |
| CLS                  |          |            |            |            |            | < 0.1    |
| INP                  |          |            |            |            |            | < 200ms  |
| Performance Score    |          |            |            |            |            | > 90     |
| SEO Score            |          |            |            |            |            | > 95     |
| Client Components    |          |            |            |            |            | ~5-6     |
| FM Imports           |          |            |            |            |            | ~4       |
```

---

## Performance Logging

> **Rule: log metrics between each phase in [`docs/performance-log.md`](./performance-log.md).**
>
> After completing each phase, BEFORE starting the next one:
> 1. Run `pnpm build` and record the output
> 2. Count client components (`grep -r "use client" src --include="*.tsx" | wc -l`)
> 3. Count framer-motion imports (`grep -r "framer-motion" src --include="*.tsx" | wc -l`)
> 4. Record observations about what changed and expected impact
> 5. After Phase 2 and Phase 3, capture Lighthouse scores for all routes
>
> The `performance-log.md` file contains pre-formatted templates for each phase.
> Fill in progressively as implementation advances.

---

## Phase 2: Replace Simple Animations with CSS

**Priority: High | Impact: High**

The biggest win. Most Framer Motion usage is for simple fade/slide entrance animations that CSS handles natively with zero JavaScript.

### 2.1 Create shared CSS animation utilities

Add animation keyframes and utility classes in the global CSS (or a dedicated file imported globally):

```css
/* Entrance animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Utility classes */
.animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-fade-in-down { animation: fade-in-down 0.6s ease-out forwards; }
.animate-scale-in { animation: scale-in 0.5s ease-out forwards; }

/* Stagger delays */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
```

### 2.2 Replace hover animations with CSS transitions

Anywhere `whileHover` is used for simple scale/opacity/color changes, replace with CSS `:hover` transitions:

```css
.hover-scale {
  transition: transform 0.2s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

**Target components:**

- `Stack.tsx` — `whileHover` on tech items
- `ProjectCard.tsx` — overlay and title hover effects (evaluate if CSS is sufficient)
- `Recommendations.tsx` — if hover animations are simple

### 2.3 Migrate components from Framer Motion to CSS

For each component, remove `motion.*` elements and replace with CSS classes:

| Component | Current FM Usage | CSS Replacement |
|---|---|---|
| `WellcomeContainer.tsx` | Fade-in on mount | `.animate-fade-in-up` class |
| `HomeTransition.tsx` | Rotate animation on globe | CSS `@keyframes rotate` |
| `Stack.tsx` | `motion.h1`, `motion.div` with variants | CSS fade-in + hover transitions |
| `Summary.tsx` | `motion.*` elements | CSS fade-in classes |
| `Recommendations.tsx` | Motion elements | CSS fade-in + transitions |
| `AnimatedBackground.tsx` | 20 animated circles | CSS `@keyframes` with random delays (see 2.4) |

### 2.4 Refactor AnimatedBackground to CSS

This component animates 20 decorative circles. Replace Framer Motion with CSS animations:

- Keep the random position/delay generation in a small client component (needs `useState` for hydration-safe randomness)
- Apply CSS `@keyframes` for the float/pulse effect instead of `motion.div` `animate` props
- Alternatively, consider converting to a pure CSS background pattern if visual fidelity allows

### 2.5 Create a lightweight ViewTrigger component

For scroll-triggered animations (elements that animate when they enter the viewport), create one small client component:

```tsx
// src/app/_components/ViewTrigger.tsx
'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'

interface ViewTriggerProps {
  children: ReactNode
  className?: string
  animationClass?: string
}

export function ViewTrigger({ children, className = '', animationClass = 'animate-fade-in-up' }: ViewTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}>
      {children}
    </div>
  )
}
```

This replaces the need for Framer Motion's `whileInView` across the entire project with a single tiny client component.

### 2.6 Post-migration check

After each component migration:

1. Verify the animation looks acceptable (doesn't need to be identical, just good)
2. Verify no `motion` imports remain in the migrated file
3. If the file no longer uses any client-side APIs, **remove `'use client'`** to make it a server component

---

## Phase 3: Optimize Component Composition

**Priority: High | Impact: High**

### 3.1 Push `'use client'` to the lowest level

Apply the **"children as server content"** pattern. Instead of marking a whole component as client, extract only the interactive wrapper:

**Before (entire component is client):**

```tsx
'use client'
export function Section() {
  return (
    <motion.div animate={...}>
      <h2>Title</h2>
      <p>Lots of static content...</p>
      <StaticList items={items} />
    </motion.div>
  )
}
```

**After (only the wrapper is client):**

```tsx
// FadeIn.tsx — client, tiny
'use client'
import { type ReactNode } from 'react'

export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`animate-fade-in-up ${className ?? ''}`}>{children}</div>
}

// Section.tsx — server, all content stays server-rendered
import { FadeIn } from './FadeIn'

export function Section() {
  return (
    <FadeIn>
      <h2>Title</h2>
      <p>Lots of static content...</p>
      <StaticList items={items} />
    </FadeIn>
  )
}
```

### 3.2 Refactor the About page

`src/app/about/page.tsx` is client-side because of `IntersectionObserver` for section tracking. Refactor:

- Extract the scroll-tracking logic into a small client component (`SectionTracker`)
- Keep the page itself as a server component
- Pass section content as `children` to the tracker

### 3.3 Refactor Navbar

`Navbar.tsx` is client-side for `usePathname()` and AnimatePresence. Options:

- Keep as client (it's small and needs pathname), but ensure it doesn't pull in large dependencies
- Replace Framer Motion animations with CSS transitions for the active indicator

### 3.4 Dynamic import for AnimatedBackground

Since `AnimatedBackground` is purely decorative and not needed for first paint or SEO:

```tsx
import dynamic from 'next/dynamic'

const AnimatedBackground = dynamic(
  () => import('./_components/AnimatedBackground'),
  { ssr: false }
)
```

This defers its JS entirely from the initial bundle.

---

## Phase 4: Keep Framer Motion Only Where Justified

**Priority: Medium | Impact: Medium**

After phases 2-3, Framer Motion should only remain in components that truly need it:

### Components that should keep Framer Motion

| Component | Reason |
|---|---|
| `ContactsContainer.tsx` | Spring physics, `useMotionValue`, `useSpring`, mouse tracking — no CSS equivalent |
| `Tooltip.tsx` | `AnimatePresence` for mount/unmount animations with spring physics |
| `ProjectsCarousel.tsx` | `layout` animations for smooth reordering — unique to Framer Motion |
| `ProjectCard.tsx` | Complex variant-based hover with overlays (evaluate if CSS suffices) |

### Components that should NOT use Framer Motion after refactor

Everything else. If a component only uses `motion.div` with `initial`/`animate` for fade/slide, it should use CSS instead.

### Consider tree-shaking

After reducing usage, verify that unused Framer Motion modules are tree-shaken from the bundle. Check with `@next/bundle-analyzer`:

```bash
pnpm add -D @next/bundle-analyzer
```

```js
// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer'

const config = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })({
  // existing config
})

export default config
```

```bash
ANALYZE=true pnpm build
```

---

## Phase 5: Final Measurement and Validation

**Priority: High**

### 5.1 Final metrics comparison

Fill in the last column of the tracking table from Phase 1.3 (`docs/metrics-tracking.md`). Compare every metric against the baseline and verify that the targets have been met. If any metric regressed or didn't meet the target, investigate before considering the refactor complete.

### 5.2 Bundle analysis

Run `@next/bundle-analyzer` (configured in Phase 4) and verify:

- Framer Motion is not loaded on routes that don't need it
- No unexpected large dependencies in the client bundle
- `three` is completely gone

### 5.3 Visual regression check

Manually verify each page:

- [ ] Home — entrance animations look smooth
- [ ] About — scroll-triggered sections work, profile image interaction works
- [ ] Projects — carousel reordering is smooth, hover effects work
- [ ] Contact — spring physics on icons work
- [ ] Navigation — route transitions and active indicator work
- [ ] Background — animated circles render and animate

---

## Execution Order Summary

```
Phase 1 (Cleanup)      ~30 min    Low risk, immediate value
  ├── 1.1 Remove three
  ├── 1.2 Fix 'use client' bugs
  └── 1.3 Baseline measurement

Phase 2 (CSS Migration) ~2-3 hrs   High impact, moderate effort
  ├── 2.1 CSS animation utilities
  ├── 2.2 CSS hover replacements
  ├── 2.3 Component-by-component migration
  ├── 2.4 AnimatedBackground refactor
  ├── 2.5 ViewTrigger component
  └── 2.6 Post-migration verification

Phase 3 (Composition)   ~1-2 hrs   High impact, architectural
  ├── 3.1 Children pattern refactors
  ├── 3.2 About page refactor
  ├── 3.3 Navbar optimization
  └── 3.4 Dynamic imports

Phase 4 (FM Cleanup)    ~30 min    Final trimming
  └── Bundle analysis and tree-shaking verification

Phase 5 (Validation)    ~30 min    Measurement and QA
  ├── 5.1 Build comparison
  ├── 5.2 Lighthouse audit
  ├── 5.3 Bundle analysis
  └── 5.4 Visual regression
```

## Notes

- Each phase can be done as a separate PR for easier review
- Phase 2 is the highest-impact change — prioritize it
- Animations don't need to be pixel-identical to current; "looks good and performs well" is the bar
- If a CSS animation doesn't feel right for a specific component, it's fine to keep Framer Motion there — the goal is reduction, not elimination
