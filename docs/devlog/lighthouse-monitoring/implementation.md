# Lighthouse Monitoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a GitHub Actions workflow that runs Lighthouse on every successful Vercel production deploy (6 audits: 3 routes × 2 devices) and emails a summary table to `ericiannj@gmail.com` via Resend.

**Architecture:** Two-job GitHub Actions workflow triggered by `deployment_status`. Job 1 runs Lighthouse in a 6-way matrix and uploads each report as a named artifact. Job 2 downloads the artifacts, runs a small Node script that parses the Lighthouse JSONs into an HTML table, and sends it through the Resend SDK.

**Tech Stack:** GitHub Actions · `lighthouse` CLI (global install) · Node 20 · built-in `node:test` runner · `resend` npm SDK · Resend sandbox sender (`onboarding@resend.dev`).

**Testing strategy:** Unit tests only for `classifyMetric` (threshold boundaries — easy to get off-by-one, benefits most from fast feedback). Everything else is validated by a local smoke test (Task 6, Step 3) and the live end-to-end test (Task 9).

**Deviation from spec:** The spec lists an `INP` column in the email table. Lighthouse lab mode does not produce INP (it's a field metric). Per Google's guidance, **TBT is the lab proxy for INP**. The implementation uses: **Performance Score, LCP, TBT, CLS, FCP**.

---

## File Structure

| File | Responsibility |
|---|---|
| `scripts/lighthouse-report.mjs` | Orchestrator + pure helper functions (parse, extract, classify, render) |
| `scripts/lighthouse-report.test.mjs` | Unit tests for `classifyMetric` only |
| `scripts/fixtures/lighthouse-mobile-home.json` | Sample Lighthouse JSON (used by the local smoke test) |
| `scripts/fixtures/lighthouse-desktop-projects.json` | Second sample (covers different preset + route for the smoke test) |
| `.github/workflows/lighthouse.yml` | The GitHub Actions workflow |
| `package.json` | Add `resend` devDependency + `test` script |

All helper functions in `lighthouse-report.mjs` are exported. Main orchestration runs only when the file is invoked as the entrypoint.

---

## Task 1: Add `resend` SDK and `test` script to package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install resend**

Run:

```bash
pnpm add -D resend
```

- [ ] **Step 2: Add `test` script**

Open `package.json` and add this line to `scripts`:

```json
"test": "node --test scripts/lighthouse-report.test.mjs"
```

Final `scripts` block should read:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "pretty": "prettier --write \"./**/*.{js,jsx,mjs,cjs,ts,tsx,json}\"",
  "test": "node --test scripts/lighthouse-report.test.mjs"
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add resend SDK and test script for lighthouse monitoring"
```

---

## Task 2: Create smoke-test fixtures

**Files:**
- Create: `scripts/fixtures/lighthouse-mobile-home.json`
- Create: `scripts/fixtures/lighthouse-desktop-projects.json`

These are minimal Lighthouse report shapes used by the local smoke test in Task 6. Only the fields the script consumes are included.

- [ ] **Step 1: Create the "all-green" fixture**

Write to `scripts/fixtures/lighthouse-mobile-home.json`:

```json
{
  "lighthouseVersion": "11.0.0",
  "requestedUrl": "https://example.com/",
  "fetchTime": "2026-04-20T12:00:00.000Z",
  "categories": {
    "performance": { "score": 0.94 }
  },
  "audits": {
    "largest-contentful-paint": { "numericValue": 2100 },
    "cumulative-layout-shift": { "numericValue": 0.05 },
    "first-contentful-paint": { "numericValue": 1200 },
    "total-blocking-time": { "numericValue": 90 }
  }
}
```

- [ ] **Step 2: Create the "mixed" fixture**

Write to `scripts/fixtures/lighthouse-desktop-projects.json`:

```json
{
  "lighthouseVersion": "11.0.0",
  "requestedUrl": "https://example.com/projects",
  "fetchTime": "2026-04-20T12:00:00.000Z",
  "categories": {
    "performance": { "score": 0.52 }
  },
  "audits": {
    "largest-contentful-paint": { "numericValue": 5100 },
    "cumulative-layout-shift": { "numericValue": 0.12 },
    "first-contentful-paint": { "numericValue": 1800 },
    "total-blocking-time": { "numericValue": 410 }
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add scripts/fixtures/
git commit -m "chore: add lighthouse report fixtures for smoke test"
```

---

## Task 3: Build `classifyMetric()` with TDD

**Files:**
- Create: `scripts/lighthouse-report.test.mjs`
- Create: `scripts/lighthouse-report.mjs`

`classifyMetric(name, value)` maps a numeric metric to `'good' | 'warn' | 'poor'` based on fixed thresholds. Thresholds have tight boundaries that are easy to get wrong — this is where tests pay off.

- [ ] **Step 1: Write failing tests**

Create `scripts/lighthouse-report.test.mjs`:

```js
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
```

- [ ] **Step 2: Run tests — they must fail**

```bash
pnpm test
```

Expected: fails with "Cannot find module ... lighthouse-report.mjs" — confirms tests are wired up and the code doesn't exist yet.

- [ ] **Step 3: Implement `classifyMetric`**

Create `scripts/lighthouse-report.mjs`:

```js
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
```

- [ ] **Step 4: Run tests — they must pass**

```bash
pnpm test
```

Expected: all `classifyMetric` tests pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/lighthouse-report.mjs scripts/lighthouse-report.test.mjs
git commit -m "feat(lighthouse): add classifyMetric with Core Web Vitals thresholds"
```

---

## Task 4: Implement `extractMetrics()` and `parseReports()`

**Files:**
- Modify: `scripts/lighthouse-report.mjs`

No new tests here — validated by the smoke test in Task 6.

- `extractMetrics(report)` — takes a parsed Lighthouse JSON, returns flat `{ performance, lcp, cls, fcp, tbt }` (null for missing audits).
- `parseReports(dir)` — reads every `lighthouse-<preset>-<route>.json` in `dir`, returns `[{ preset, route, metrics }]`.

- [ ] **Step 1: Append imports and the two functions**

Append to the top of `scripts/lighthouse-report.mjs` (alongside existing code):

```js
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
```

Then append these functions at the bottom of the file:

```js
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
```

- [ ] **Step 2: Confirm classifyMetric tests still pass**

```bash
pnpm test
```

Expected: all existing `classifyMetric` tests still pass. (We only added new exports, didn't modify existing ones.)

- [ ] **Step 3: Commit**

```bash
git add scripts/lighthouse-report.mjs
git commit -m "feat(lighthouse): add extractMetrics and parseReports helpers"
```

---

## Task 5: Implement `renderEmail()`

**Files:**
- Modify: `scripts/lighthouse-report.mjs`

`renderEmail({ commitSha, commitMessage, runUrl, commitUrl, results })` returns `{ subject, html }`. Validated by the smoke test in Task 6 (visually inspect the received email).

- [ ] **Step 1: Append to `scripts/lighthouse-report.mjs`**

```js
const CELL_COLORS = {
  good: '#d1fae5',
  warn: '#fef3c7',
  poor: '#fecaca',
};

export function renderEmail({
  commitSha,
  commitMessage,
  runUrl,
  commitUrl,
  results,
}) {
  const shortSha = commitSha.slice(0, 7);
  const firstLine = commitMessage.split('\n')[0];
  const subject = `🚦 Lighthouse — ${shortSha} — ${firstLine}`;

  const mobile = results.filter((r) => r.preset === 'mobile');
  const desktop = results.filter((r) => r.preset === 'desktop');

  const html = `
<div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 680px; margin: 0 auto; color: #111;">
  <h1 style="font-size: 20px; margin-bottom: 4px;">Lighthouse Report</h1>
  <p style="color: #555; margin-top: 0;">
    <strong>Commit:</strong>
    <a href="${escapeHtml(commitUrl)}" style="color: #2563eb; text-decoration: none;">${shortSha}</a>
    · ${escapeHtml(firstLine)}
  </p>
  <h2 style="font-size: 16px; margin-top: 24px;">📱 Mobile</h2>
  ${renderTable(mobile)}
  <h2 style="font-size: 16px; margin-top: 24px;">🖥️ Desktop</h2>
  ${renderTable(desktop)}
  <p style="margin-top: 32px;">
    <a href="${escapeHtml(runUrl)}" style="color: #2563eb;">View full reports →</a>
  </p>
</div>`.trim();

  return { subject, html };
}

function renderTable(rows) {
  const header = `
    <tr style="background: #f3f4f6;">
      <th style="padding: 8px; text-align: left;">Route</th>
      <th style="padding: 8px;">Perf.</th>
      <th style="padding: 8px;">LCP</th>
      <th style="padding: 8px;">TBT</th>
      <th style="padding: 8px;">CLS</th>
      <th style="padding: 8px;">FCP</th>
    </tr>`;
  const body = rows.map(renderRow).join('');
  return `<table style="border-collapse: collapse; width: 100%; font-size: 14px;">${header}${body}</table>`;
}

function renderRow({ route, metrics }) {
  return `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(route)}</td>
      ${renderCell('performance', metrics.performance, (v) => String(v))}
      ${renderCell('lcp', metrics.lcp, formatMs)}
      ${renderCell('tbt', metrics.tbt, formatMs)}
      ${renderCell('cls', metrics.cls, formatCls)}
      ${renderCell('fcp', metrics.fcp, formatMs)}
    </tr>`;
}

function renderCell(metric, value, formatter) {
  if (value === null || value === undefined) {
    return `<td style="padding: 8px; text-align: center; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">—</td>`;
  }
  const level = classifyMetric(metric, value);
  const bg = CELL_COLORS[level];
  return `<td style="padding: 8px; text-align: center; background: ${bg}; border-bottom: 1px solid #e5e7eb;">${formatter(value)}</td>`;
}

function formatMs(v) {
  return v < 1000 ? `${Math.round(v)} ms` : `${(v / 1000).toFixed(1)} s`;
}

function formatCls(v) {
  return v.toFixed(2);
}

function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
}
```

- [ ] **Step 2: Confirm tests still pass**

```bash
pnpm test
```

- [ ] **Step 3: Commit**

```bash
git add scripts/lighthouse-report.mjs
git commit -m "feat(lighthouse): add renderEmail with colored metric tables"
```

---

## Task 6: Wire up main orchestrator + local smoke test

**Files:**
- Modify: `scripts/lighthouse-report.mjs`

The entrypoint reads env vars, parses reports, renders the email, and sends it via Resend. The smoke test verifies everything end-to-end locally before pushing.

- [ ] **Step 1: Append the main block**

Append to `scripts/lighthouse-report.mjs`:

```js
import { Resend } from 'resend';
import { fileURLToPath } from 'node:url';

async function main() {
  const {
    RESEND_API_KEY,
    COMMIT_SHA = '',
    COMMIT_MESSAGE = '(no commit message)',
    RUN_URL = '',
    COMMIT_URL = '',
  } = process.env;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is required');
    process.exit(1);
  }

  const results = await parseReports('./reports');
  if (results.length === 0) {
    console.error('No Lighthouse reports found in ./reports');
    process.exit(1);
  }

  const { subject, html } = renderEmail({
    commitSha: COMMIT_SHA,
    commitMessage: COMMIT_MESSAGE,
    runUrl: RUN_URL,
    commitUrl: COMMIT_URL,
    results,
  });

  const resend = new Resend(RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'ericiannj@gmail.com',
    subject,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    process.exit(1);
  }

  console.log(`Email sent (id=${data?.id}); ${results.length} reports.`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
```

- [ ] **Step 2: Local smoke test setup**

Before running, you need a Resend account + API key. If you haven't done that yet, jump to Task 8 (steps 1–2) and come back.

```bash
mkdir -p reports
cp scripts/fixtures/*.json reports/
```

- [ ] **Step 3: Run the smoke test**

```bash
RESEND_API_KEY="re_your_real_key_here" \
  COMMIT_SHA="local0000000000000000000000000000000000" \
  COMMIT_MESSAGE="local test: lighthouse email" \
  RUN_URL="https://github.com/ericiannj/ej-portfolio/actions" \
  COMMIT_URL="https://github.com/ericiannj/ej-portfolio" \
  node scripts/lighthouse-report.mjs
```

Expected stdout:

```
Email sent (id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx); 2 reports.
```

Then check Gmail (inbox + spam). Verify:
- Subject: `🚦 Lighthouse — local00 — local test: lighthouse email`
- One mobile table (row: `home`) and one desktop table (row: `projects`)
- Mobile row: all cells green
- Desktop row: mix of red/yellow cells
- Links at the bottom work

If the email doesn't arrive or the layout is wrong, fix the script and re-run before committing.

- [ ] **Step 4: Clean up temp reports**

```bash
rm -rf reports
```

- [ ] **Step 5: Confirm classifyMetric tests still pass**

```bash
pnpm test
```

- [ ] **Step 6: Commit**

```bash
git add scripts/lighthouse-report.mjs
git commit -m "feat(lighthouse): add main orchestrator that sends email via Resend"
```

---

## Task 7: Create the GitHub Actions workflow

**Files:**
- Create: `.github/workflows/lighthouse.yml`

- [ ] **Step 1: Create the workflow file**

Write to `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  deployment_status:

jobs:
  audit:
    if: |
      github.event.deployment_status.state == 'success' &&
      github.event.deployment.environment == 'Production'
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        path: ['/', '/about', '/projects']
        preset: ['mobile', 'desktop']
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install -g lighthouse

      - name: Derive safe path name
        id: name
        run: |
          raw="${{ matrix.path }}"
          stripped="${raw#/}"
          echo "value=${stripped:-home}" >> "$GITHUB_OUTPUT"

      - name: Run Lighthouse
        run: |
          lighthouse "${{ github.event.deployment_status.target_url }}${{ matrix.path }}" \
            --preset=${{ matrix.preset }} \
            --output=json --output=html \
            --output-path=./lighthouse-${{ matrix.preset }}-${{ steps.name.outputs.value }} \
            --chrome-flags="--headless --no-sandbox"

      - uses: actions/upload-artifact@v4
        with:
          name: lighthouse-${{ matrix.preset }}-${{ steps.name.outputs.value }}
          path: |
            lighthouse-${{ matrix.preset }}-${{ steps.name.outputs.value }}.html
            lighthouse-${{ matrix.preset }}-${{ steps.name.outputs.value }}.json
          retention-days: 90

  notify:
    needs: audit
    # Run even if some matrix jobs failed, but skip when `audit` was skipped
    # (non-production deploys or failed deploys).
    if: ${{ !cancelled() && needs.audit.result != 'skipped' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - run: pnpm install --frozen-lockfile

      - uses: actions/download-artifact@v4
        with:
          pattern: lighthouse-*
          path: ./reports
          merge-multiple: true

      - name: Send summary email
        env:
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          COMMIT_SHA: ${{ github.sha }}
          COMMIT_MESSAGE: ${{ github.event.deployment.description }}
          RUN_URL: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
          COMMIT_URL: https://github.com/${{ github.repository }}/commit/${{ github.sha }}
        run: node scripts/lighthouse-report.mjs
```

- [ ] **Step 2: YAML sanity check**

Open the file in VS Code and confirm the YAML extension shows no errors. Alternatively:

```bash
npx --yes js-yaml .github/workflows/lighthouse.yml > /dev/null
```

Expected: no output (valid YAML).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/lighthouse.yml
git commit -m "ci: add lighthouse workflow for production deploy monitoring"
```

---

## Task 8: One-time external setup (manual)

These steps happen outside the codebase and only need to be done once.

- [ ] **Step 1: Create Resend account**
  - Go to [resend.com](https://resend.com)
  - Sign up with `ericiannj@gmail.com` (mandatory — sandbox sender only delivers to the account email)
  - Verify the email

- [ ] **Step 2: Create API key**
  - Dashboard → **API Keys** → **Create API Key**
  - Name: `portfolio-lighthouse`
  - Permission: **Sending access**
  - Copy the key (starts with `re_...`) — shown only once

- [ ] **Step 3: Add GitHub secret**
  - Repo → **Settings → Secrets and variables → Actions**
  - **New repository secret**
  - Name: `RESEND_API_KEY`
  - Value: the key from step 2

- [ ] **Step 4: Verify Vercel ↔ GitHub integration**
  - Repo → **Settings → Webhooks**
  - A webhook from `vercel.com` should be listed and active
  - No action needed if present — this is the source of `deployment_status` events

---

## Task 9: Live end-to-end test

**Files:** none

- [ ] **Step 1: Push all commits to main**

```bash
git push origin main
```

- [ ] **Step 2: Watch the deploy + workflow**
  - Vercel deploys (~1 min)
  - Once the deploy reports success, the `Lighthouse CI` workflow starts automatically
  - Observe under the repo's **Actions** tab

- [ ] **Step 3: Verify the email**
  - Check `ericiannj@gmail.com` inbox (and spam)
  - Expected: subject `🚦 Lighthouse — <sha> — <commit message>`
  - Expected: two tables (Mobile / Desktop) × 3 routes each
  - Expected: cells colored green/yellow/red per thresholds
  - Expected: "View full reports →" link points to the Actions run

- [ ] **Step 4: Download one artifact to confirm**
  - From the Actions run page, scroll to **Artifacts**
  - Download `lighthouse-mobile-home`
  - Open the `.html` file — it should be a full Lighthouse report

- [ ] **Step 5: Mark first email as "not spam"** (if it landed there)
  - Trains Gmail so subsequent emails hit the inbox directly.

---

## Out of scope

- Running Lighthouse on preview / PR deploys
- Auditing routes beyond `/`, `/about`, `/projects`
- Historical comparison / baselines / regression alerts
- CI-based test running (tests are a local safety net only)
- Slack, Discord, or other notification channels
- Custom Lighthouse configs beyond the built-in presets
