<div align="center">
  <img src="src/app/favicon.ico" alt="Portfolio icon" width="64" />
  <h1>Eric Junqueira · Portfolio</h1>
  <p>Personal site and portfolio for Eric Junqueira — full-stack developer with a front-end focus.</p>
  <p>Live at <a href="https://ericjunqueira.com">ericjunqueira.com</a></p>
</div>

---

## Why

Most portfolio templates ship with generic layouts and predictable motion. This one is built from scratch to serve as a production-quality reference — tight Lighthouse scores, a typed codebase, automated performance monitoring on every deploy, and a design that reflects the actual work.

## Features

- **App Router + React 19** — File-based routing with Next.js 16, server and client components where each makes sense.
- **Tailwind CSS v4** — Utility-first styling with the new CSS-native config model; no `tailwind.config.js`.
- **Framer Motion animations** — Page transitions and element reveals with accessible reduced-motion support.
- **Automated Lighthouse CI** — Every production deploy triggers Lighthouse audits on all three routes (mobile + desktop) and emails a summary via Resend.
- **Three routes** — `/` (home), `/about`, `/projects`.

## Quick Start

**Prerequisites:** Node.js 20+ and pnpm 10 (version pinned via [`packageManager`](https://nodejs.org/api/packages.html#packagemanager) in `package.json`).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The dev script runs Turbopack (`next dev --turbo`).

## Stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| Framework   | [Next.js](https://nextjs.org) 16 (App Router)               |
| UI          | [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) v4 |
| Motion      | [Framer Motion](https://www.framer.com/motion/)             |
| Icons       | [Lucide React](https://lucide.dev)                          |
| Language    | TypeScript                                                  |

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `pnpm dev`        | Start development server (Turbopack)             |
| `pnpm build`      | Production build                                 |
| `pnpm start`      | Serve production build locally                   |
| `pnpm lint`       | Run ESLint                                       |
| `pnpm lint:fix`   | ESLint with auto-fix                             |
| `pnpm pretty`     | Format with Prettier                             |
| `pnpm test`       | Run Node tests (e.g. Lighthouse report helpers)  |

## Performance Monitoring

After a successful production deployment, GitHub Actions runs [Lighthouse](https://developers.google.com/web/tools/lighthouse) on `/`, `/about`, and `/projects` (mobile + desktop). A summary email is sent via [Resend](https://resend.com). The workflow expects a `RESEND_API_KEY` repository secret.

## Deploy

Deployed on [Vercel](https://vercel.com). Site metadata and canonical URL live in `src/app/layout.tsx`.
