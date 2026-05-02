import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

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

// Lighthouse writes `*.report.json` when using --output-path with multiple formats.
const REPORT_PATTERN =
  /^lighthouse-(mobile|desktop)-([\w-]+)\.(?:report\.)?json$/;

export async function parseReports(dir) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new Error(
        `${dir} is missing. Check that Lighthouse audit jobs uploaded artifacts (.report.json) and download-artifact ran successfully.`,
      );
    }
    throw err;
  }
  const results = [];

  for (const entry of entries) {
    const match = entry.match(REPORT_PATTERN);
    if (!match) continue;
    const [, preset, route] = match;

    const contents = await readFile(join(dir, entry), 'utf8');
    const report = JSON.parse(contents);

    results.push({ preset, route, metrics: extractMetrics(report) });
  }

  results.sort((a, b) => {
    if (a.preset !== b.preset) return a.preset.localeCompare(b.preset);
    return a.route.localeCompare(b.route);
  });

  return results;
}

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

async function main() {
  const {
    RESEND_API_KEY,
    COMMIT_SHA = '',
    COMMIT_MESSAGE,
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
    commitMessage: COMMIT_MESSAGE || '(no commit message)',
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
