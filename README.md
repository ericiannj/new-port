# Eric Junqueira · Portfolio

Personal site and portfolio for Eric Junqueira — full-stack developer with a front-end focus. Live at [ericjunqueira.com](https://ericjunqueira.com).

## Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI:** [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) v4
- **Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev)
- **Language:** TypeScript

## Prerequisites

- Node.js **20+**
- **pnpm** 10 — version pinned via [`packageManager`](https://nodejs.org/api/packages.html#packagemanager) in `package.json`

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The dev script uses Turbopack (`next dev --turbo`).

Main routes: `/` (home), `/about`, `/projects`.

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `pnpm dev`        | Start development server                         |
| `pnpm build`      | Production build                                 |
| `pnpm start`      | Serve production build locally                   |
| `pnpm lint`       | Run ESLint                                       |
| `pnpm lint:fix`   | ESLint with auto-fix                             |
| `pnpm pretty`     | Format with Prettier                             |
| `pnpm test`       | Run Node tests (e.g. Lighthouse report helpers)  |

## Performance monitoring

After a **successful Production deployment**, GitHub Actions runs [Lighthouse](https://developers.google.com/web/tools/lighthouse) on `/`, `/about`, and `/projects` (mobile + desktop). A summary email is sent via [Resend](https://resend.com); the workflow expects a `RESEND_API_KEY` repository secret.

## Deploy

The site is deployed on [Vercel](https://vercel.com). Site metadata and canonical URL live in `src/app/layout.tsx`.
