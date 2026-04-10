# LCP Optimization Plan

## Goal

Reduce LCP from ~7s to < 2.5s (mobile) and push Lighthouse Performance Score above 90.

## Current State

- **LCP:** 6.9-7.5s across all routes (mobile, Slow 4G)
- **Performance Score:** 73-74
- **FCP:** 0.8s (already good)
- **TBT:** 140-190ms (already within target)

## Root Causes

### 1. TransitionWrapper blocks all content for 2 seconds (Critical)

`TransitionWrapper` wraps the entire app shell in `layout.tsx`. On first load, it shows `HomeTransition` (language cycling animation + globe spin) for 2 full seconds before rendering ANY content — Navbar, page content, everything.

On Slow 4G, the JS parse + 2s intentional delay + hydration pushes LCP to 5-7s minimum.

**Files:**
- `src/app/layout.tsx` — imports and renders TransitionWrapper
- `src/app/_components/TransitionWrapper.tsx` — manages show/hide state
- `src/app/_components/HomeTransition.tsx` — the animation itself

### 2. Profile image is 2.2MB for a 112px display (High)

`src/assets/images/profile.jpeg` is 2.2MB, rendered at 112x112px with `quality={100}`. On the /about page, this is likely the LCP element. Even with Next.js Image optimization, the source is far too large.

**File:** `src/app/about/components/CustomProfileImage.tsx`

### 3. GIFs used for small icons (Medium)

Three GIF files (195KB-370KB) are used at 32x32px in the Perspectives section. GIF is the worst format for this — even static PNGs or SVGs would be lighter.

| File | Size | Display Size |
|---|---|---|
| `src/assets/gifs/target.gif` | 195KB | 32x32 |
| `src/assets/gifs/resume.gif` | 307KB | 32x32 |
| `src/assets/gifs/coffe.gif` | 370KB | not used |

### 4. Project images without priority on first visible card (Low)

The carousel gives `priority` to `index === 1` (center card), which is correct. No change needed.

---

## Phase 1: Make TransitionWrapper Non-Blocking

**Impact: Highest | Risk: Medium (changes UX)**

The transition is a "nice-to-have" intro animation. It should NOT block the LCP element from rendering.

### Option A: Overlay pattern (recommended)

Instead of conditionally rendering content, render everything immediately and show the transition as an overlay on top. The browser can paint the actual content underneath while the animation plays.

```tsx
// TransitionWrapper.tsx
'use client';

import { useState, useEffect } from 'react';
import HomeTransition from './HomeTransition';

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTransition(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showTransition && (
        <div className="fixed inset-0 z-50">
          <HomeTransition onEnd={() => setShowTransition(false)} />
        </div>
      )}
      {children}
    </>
  );
}
```

This way the actual page content renders immediately (good for LCP) and the transition overlays on top until it finishes.

### Option B: Remove the transition entirely

The simplest approach. The transition plays once on first visit and is never seen again. Removing it would instantly drop LCP by ~2s.

### Option C: CSS-only intro

Replace the JS transition with a CSS animation on the body that fades in. Zero JS overhead, zero LCP impact.

---

## Phase 2: Optimize Profile Image

**Impact: High (especially /about) | Risk: Low**

### 2.1 Resize the source image

The 2.2MB JPEG is being displayed at 112x112px. Even accounting for 2x/3x retina, a 336x336px source is more than enough.

Steps:
1. Resize `profile.jpeg` to ~400x400px
2. Convert to WebP (or let Next.js Image handle it)
3. Reduce quality from 100 to 80-85 — visually indistinguishable at 112px

Expected result: 2.2MB → ~30-50KB

### 2.2 Reduce quality prop

Change `quality={100}` to `quality={85}` (or remove it — Next.js defaults to 75).

---

## Phase 3: Replace GIFs with Lightweight Alternatives

**Impact: Medium | Risk: Low**

### 3.1 Convert animated GIFs to animated WebP

Use `cwebp` or an online tool. Expected savings: 60-80% reduction.

### 3.2 Consider static alternatives

If the animations are simple (spinning target, paper flip), CSS animations on SVG/PNG icons would be much lighter.

### 3.3 Remove unused GIF

`coffe.gif` (370KB) is not imported anywhere. Delete it.

---

## Phase 4: Measurement

Re-run Lighthouse on all routes and compare against the post-rendering-refactor baseline.

**Target metrics:**

| Metric | Current | Target |
|---|---|---|
| LCP (/) | 6.9s | < 2.5s |
| LCP (/about) | 6.9s | < 2.5s |
| LCP (/projects) | 7.5s | < 2.5s |
| Performance Score | 73-74 | > 90 |

---

## Execution Order

```
Phase 1 (TransitionWrapper)   High impact, medium effort
  └── Choose Option A, B, or C and implement

Phase 2 (Profile Image)       High impact, low effort
  ├── 2.1 Resize source image
  └── 2.2 Reduce quality prop

Phase 3 (GIFs)                Medium impact, low effort
  ├── 3.1 Convert or replace GIFs
  └── 3.2 Delete unused coffe.gif

Phase 4 (Measurement)         Validation
  └── Lighthouse comparison
```

## Notes

- Phase 1 is the decisive change — without it, LCP cannot drop below ~5s on throttled connections
- The TransitionWrapper decision is a UX call: discuss with the user whether the intro animation is worth the performance cost
- Profile image optimization alone could improve /about LCP by 1-2s
- All phases can be separate commits/PRs
