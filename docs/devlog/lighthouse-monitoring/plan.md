# Lighthouse Monitoring Plan

## Goal

Monitor Core Web Vitals on every production deploy. After a push to `main` triggers a Vercel deploy, automatically run Lighthouse against the three main routes (mobile + desktop), then email a summary with a link to the full reports.

## Scope

- **Trigger:** every successful production deploy on Vercel
- **Routes audited:** `/`, `/about`, `/projects`
- **Devices:** mobile (Slow 4G throttled — the Lighthouse default) and desktop
- **Total runs per commit:** 6 (3 routes × 2 devices)
- **Delivery:** email via Resend sandbox to `ericiannj@gmail.com`

## Non-goals

- Baseline comparison or regression alerts (not storing history)
- Failing the CI pipeline when metrics drop
- Auditing preview deploys or PRs (production only)
- Dashboards or time-series tracking

---

## Architecture

```
push to main
   │
   ▼
Vercel deploys → posts deployment_status to GitHub
   │
   ▼
GitHub Actions (.github/workflows/lighthouse.yml)
   │
   ├─ Job 1: audit (matrix 3 × 2 = 6 parallel runs)
   │    ├─ run lighthouse against deployment_status.target_url + path
   │    ├─ generate JSON + HTML per run
   │    └─ upload each report as a named artifact
   │
   └─ Job 2: notify (depends on audit, runs on always())
        ├─ download all artifacts
        ├─ node scripts/lighthouse-report.mjs
        │    - parse 6 JSONs
        │    - build HTML email with 2 tables (mobile / desktop)
        │    - color metrics by Core Web Vitals thresholds
        │    - send via Resend SDK
        └─ done — email in inbox
```

**Key decision:** use the `deployment_status` GitHub event instead of `push`. Vercel posts this event automatically through its GitHub integration once a deploy finishes. Filtering on `state == 'success'` and `environment == 'Production'` makes the workflow only run on real, successful production deploys — no preview noise, no wasted runs on failed deploys.

---

## Components

### 1. Workflow — `.github/workflows/lighthouse.yml`

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
          # '/' -> 'home', '/about' -> 'about', '/projects' -> 'projects'
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
    # Run even when some matrix jobs failed, but skip when `audit` itself was
    # skipped (i.e. the deploy wasn't a successful production deploy).
    if: ${{ !cancelled() && needs.audit.result != 'skipped' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - uses: actions/download-artifact@v4
        with:
          pattern: lighthouse-*
          path: ./reports
          merge-multiple: true
      - name: Send email
        env:
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          COMMIT_SHA: ${{ github.sha }}
          COMMIT_MESSAGE: ${{ github.event.deployment.description }}
          RUN_URL: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
          COMMIT_URL: https://github.com/${{ github.repository }}/commit/${{ github.sha }}
        run: node scripts/lighthouse-report.mjs
```

### 2. Email script — `scripts/lighthouse-report.mjs`

**Responsibilities:**
1. Read all JSON reports from `./reports/`
2. Extract metrics from each: `categories.performance.score`, `audits['largest-contentful-paint'].numericValue`, `audits['interaction-to-next-paint']` (or equivalent), `audits['cumulative-layout-shift']`, `audits['first-contentful-paint']`, `audits['total-blocking-time']`
3. Parse filenames to infer device + route (format: `lighthouse-<preset>-<route>.json`)
4. Build HTML email with two tables (mobile, desktop)
5. Color each cell by threshold (see below)
6. Call Resend API: `new Resend(process.env.RESEND_API_KEY).emails.send(...)`

**Dependencies to add to `package.json` devDependencies:**
- `resend` — official SDK, ~20KB

**Error handling:**
- If a JSON file is missing (one of the six audits failed), render `—` in that row's cells instead of crashing
- If `RESEND_API_KEY` is missing, exit with clear error message
- If the Resend call fails, log response and exit 1 (so the workflow step shows as failed)

### 3. Email format

**Subject:** `🚦 Lighthouse — <short sha> — <commit title>`

**Body sections:**
1. Header: commit hash, commit message, timestamp (America/Sao_Paulo)
2. Mobile table: Route | Performance | LCP | INP | CLS | FCP | TBT
3. Desktop table: same columns
4. Footer: link to Actions run (for artifacts) + link to commit on GitHub

**Thresholds (standard Core Web Vitals):**

| Metric | 🟢 Good | 🟡 Needs improvement | 🔴 Poor |
|---|---|---|---|
| Performance score | ≥ 90 | 50–89 | < 50 |
| LCP | ≤ 2.5s | ≤ 4.0s | > 4.0s |
| INP | ≤ 200ms | ≤ 500ms | > 500ms |
| CLS | ≤ 0.1 | ≤ 0.25 | > 0.25 |
| FCP | ≤ 1.8s | ≤ 3.0s | > 3.0s |
| TBT | ≤ 200ms | ≤ 600ms | > 600ms |

Colors applied as inline `background-color` in table cells so they render in every email client.

---

## One-time setup

Before the first run works end-to-end, the following manual steps are required:

### Resend
1. Create an account at [resend.com](https://resend.com) using `ericiannj@gmail.com`
   - **Important:** the sandbox sender `onboarding@resend.dev` only delivers to the account's own email, so the account must be created with this address.
2. Create an API key in the Resend dashboard with "send" permission.
3. Copy the key (starts with `re_...`).

### GitHub
1. In the repo, go to **Settings → Secrets and variables → Actions → New repository secret**.
2. Name: `RESEND_API_KEY`, value: the key from step 3 above.

### Vercel integration check
- No setup needed — the Vercel/GitHub integration already posts `deployment_status` events.
- Can be verified at **Settings → Webhooks** (a Vercel webhook should be listed).

### First test
- First email may land in Gmail's spam folder (sandbox senders often do on the first hit). Mark as "not spam" to train the filter.

---

## Trade-offs and notes

- **Every push emails** — user chose this over "email only on regression". Keeps the setup simple (no baseline storage) and gives ongoing visibility. If it becomes noisy, phase 2 could add a threshold gate.
- **Sandbox sender** — chosen over verifying a custom domain. Good for a solo personal project; the cost is occasional spam-folder landings and a non-branded "From" address.
- **Artifacts over GitHub Pages** — artifact URLs require login, which is fine for a solo project. Pages would add complexity (branch management, custom domain) with no real benefit here.
- **Matrix parallelism** — 6 parallel runs finish in roughly the time of 1 (GitHub allots 20 concurrent jobs on free tier), keeping total pipeline time around 1–2 minutes.
- **No baseline comparison** — keeps scope tight. Trend analysis is left to human review of the email table over time.

---

## Execution order

```
Step 1  Create Resend account, API key, GitHub secret          (manual, ~3 min)
Step 2  Add scripts/lighthouse-report.mjs                      (code)
Step 3  Add .github/workflows/lighthouse.yml                   (code)
Step 4  Install resend SDK as devDependency                    (code)
Step 5  Merge to main → Vercel deploys → workflow runs         (validation)
Step 6  Check inbox, verify table renders, verify artifact link
```

Steps 2–4 are a single PR. Step 5 is the first live test.

## Out of scope for this plan

- Running Lighthouse locally (the workflow only targets the deployed prod URL)
- Auditing pages beyond `/`, `/about`, `/projects` (individual project detail pages excluded)
- Storing metrics in a database, Gist, or baseline file
- Slack/Discord/other notification channels
- Custom Lighthouse config (default presets only)
