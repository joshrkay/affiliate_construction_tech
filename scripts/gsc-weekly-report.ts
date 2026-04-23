/**
 * GSC Weekly Report Generator
 *
 * Parses Google Search Console CSV exports (dropped in /reports/)
 * and produces a markdown summary focused on ranking opportunities.
 *
 * Expected inputs in /reports/:
 *   - gsc-queries-*.csv  (required)   — columns: Query, Clicks, Impressions, CTR, Position
 *   - gsc-pages-*.csv    (optional)   — columns: Page, Clicks, Impressions, CTR, Position
 *   - gsc-countries-*.csv (optional)
 *   - gsc-devices-*.csv  (optional)
 *
 * Run: npx tsx scripts/gsc-weekly-report.ts
 * Output: reports/gsc-report-YYYY-MM-DD.md
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve } from "path";

const REPORTS_DIR = resolve(import.meta.dirname, "..", "reports");
const today = new Date().toISOString().slice(0, 10);

interface GscQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GscPageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function findLatest(prefix: string): string | null {
  if (!existsSync(REPORTS_DIR)) return null;
  const matches = readdirSync(REPORTS_DIR)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".csv"))
    .sort()
    .reverse();
  return matches.length ? resolve(REPORTS_DIR, matches[0]) : null;
}

function parseCsv(path: string): string[][] {
  const text = readFileSync(path, "utf-8");
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  return lines.map(parseCsvLine);
}

function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cells.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current);
  return cells.map((c) => c.trim());
}

function parseNumber(cell: string): number {
  if (!cell) return 0;
  const cleaned = cell.replace(/[,%]/g, "").trim();
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function parseQueries(path: string): GscQueryRow[] {
  const rows = parseCsv(path);
  const header = rows[0].map((h) => h.toLowerCase());
  const qI = header.findIndex((h) => h.includes("quer") || h.includes("search"));
  const clI = header.findIndex((h) => h.includes("click"));
  const imI = header.findIndex((h) => h.includes("impress"));
  const ctI = header.findIndex((h) => h.includes("ctr"));
  const poI = header.findIndex((h) => h.includes("position"));
  return rows.slice(1).map((r) => ({
    query: r[qI] || "",
    clicks: parseNumber(r[clI]),
    impressions: parseNumber(r[imI]),
    ctr: parseNumber(r[ctI]),
    position: parseNumber(r[poI]),
  })).filter((r) => r.query);
}

function parsePages(path: string): GscPageRow[] {
  const rows = parseCsv(path);
  const header = rows[0].map((h) => h.toLowerCase());
  const pI = header.findIndex((h) => h.includes("page") || h.includes("url"));
  const clI = header.findIndex((h) => h.includes("click"));
  const imI = header.findIndex((h) => h.includes("impress"));
  const ctI = header.findIndex((h) => h.includes("ctr"));
  const poI = header.findIndex((h) => h.includes("position"));
  return rows.slice(1).map((r) => ({
    page: r[pI] || "",
    clicks: parseNumber(r[clI]),
    impressions: parseNumber(r[imI]),
    ctr: parseNumber(r[ctI]),
    position: parseNumber(r[poI]),
  })).filter((r) => r.page);
}

function mdTable(headers: string[], rows: string[][]): string {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return [head, sep, body].join("\n");
}

function summarize(queries: GscQueryRow[], pages: GscPageRow[] | null): string {
  const out: string[] = [];
  out.push(`# GSC Report — ${today}`);
  out.push("");
  out.push(`Parsed ${queries.length} queries${pages ? ` and ${pages.length} pages` : ""}.`);
  out.push("");

  // Totals
  const totalClicks = queries.reduce((s, q) => s + q.clicks, 0);
  const totalImpressions = queries.reduce((s, q) => s + q.impressions, 0);
  const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgPosition =
    queries.length > 0
      ? queries.reduce((s, q) => s + q.position * q.impressions, 0) / Math.max(totalImpressions, 1)
      : 0;

  out.push("## Totals");
  out.push("");
  out.push(`- **Total clicks**: ${totalClicks.toLocaleString()}`);
  out.push(`- **Total impressions**: ${totalImpressions.toLocaleString()}`);
  out.push(`- **Overall CTR**: ${overallCtr.toFixed(2)}%`);
  out.push(`- **Impression-weighted avg position**: ${avgPosition.toFixed(1)}`);
  out.push("");

  // Ripest opportunities: positions 11–30 with ≥50 impressions
  const ripe = queries
    .filter((q) => q.position >= 11 && q.position <= 30 && q.impressions >= 50)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 25);
  out.push("## Ripe opportunities (pos 11–30, ≥50 impressions)");
  out.push("");
  out.push("These queries are one page of SERP away from earning clicks. Invest here first.");
  out.push("");
  if (ripe.length === 0) {
    out.push("_No queries match this filter yet. Possible reasons: site too new to index, insufficient impressions, or narrow GSC date range._");
  } else {
    out.push(
      mdTable(
        ["Query", "Pos", "Impr", "Clicks", "CTR"],
        ripe.map((q) => [
          q.query,
          q.position.toFixed(1),
          q.impressions.toLocaleString(),
          q.clicks.toString(),
          `${q.ctr.toFixed(1)}%`,
        ]),
      ),
    );
  }
  out.push("");

  // Striking distance: positions 4–10 (first page, below fold)
  const striking = queries
    .filter((q) => q.position >= 4 && q.position <= 10 && q.impressions >= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);
  out.push("## Striking distance (pos 4–10, first page)");
  out.push("");
  out.push("Already on page 1. Better titles/meta, freshness signals, or FAQ schema can bump them into the top 3.");
  out.push("");
  if (striking.length === 0) {
    out.push("_No first-page queries yet._");
  } else {
    out.push(
      mdTable(
        ["Query", "Pos", "Impr", "Clicks", "CTR"],
        striking.map((q) => [
          q.query,
          q.position.toFixed(1),
          q.impressions.toLocaleString(),
          q.clicks.toString(),
          `${q.ctr.toFixed(1)}%`,
        ]),
      ),
    );
  }
  out.push("");

  // High impressions, low CTR → title/meta problem
  const ctrProblems = queries
    .filter((q) => q.impressions >= 200 && q.ctr < 1.5 && q.position <= 20)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15);
  out.push("## High impressions, low CTR (title/meta problem)");
  out.push("");
  out.push("Good ranking but readers are not clicking. Rewrite title tag + meta description.");
  out.push("");
  if (ctrProblems.length === 0) {
    out.push("_No CTR problems detected._");
  } else {
    out.push(
      mdTable(
        ["Query", "Pos", "Impr", "CTR"],
        ctrProblems.map((q) => [
          q.query,
          q.position.toFixed(1),
          q.impressions.toLocaleString(),
          `${q.ctr.toFixed(2)}%`,
        ]),
      ),
    );
  }
  out.push("");

  // Top-clicking queries
  const topClicks = queries
    .filter((q) => q.clicks > 0)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 15);
  out.push("## Top-clicking queries");
  out.push("");
  if (topClicks.length === 0) {
    out.push("_No clicks yet._");
  } else {
    out.push(
      mdTable(
        ["Query", "Pos", "Impr", "Clicks", "CTR"],
        topClicks.map((q) => [
          q.query,
          q.position.toFixed(1),
          q.impressions.toLocaleString(),
          q.clicks.toString(),
          `${q.ctr.toFixed(1)}%`,
        ]),
      ),
    );
  }
  out.push("");

  // Pages report
  if (pages) {
    const topPages = pages
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 15);
    out.push("## Top pages by impressions");
    out.push("");
    out.push(
      mdTable(
        ["Page", "Pos", "Impr", "Clicks", "CTR"],
        topPages.map((p) => [
          p.page.replace("https://bestconstructionapps.com", ""),
          p.position.toFixed(1),
          p.impressions.toLocaleString(),
          p.clicks.toString(),
          `${p.ctr.toFixed(1)}%`,
        ]),
      ),
    );
    out.push("");

    const zeroClickPages = pages
      .filter((p) => p.impressions >= 100 && p.clicks === 0)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10);
    if (zeroClickPages.length > 0) {
      out.push("## Pages with impressions but zero clicks");
      out.push("");
      out.push("Investigate: thin content, bad title, or non-matching intent.");
      out.push("");
      out.push(
        mdTable(
          ["Page", "Pos", "Impr"],
          zeroClickPages.map((p) => [
            p.page.replace("https://bestconstructionapps.com", ""),
            p.position.toFixed(1),
            p.impressions.toLocaleString(),
          ]),
        ),
      );
      out.push("");
    }
  }

  out.push("---");
  out.push("");
  out.push(`Generated by \`scripts/gsc-weekly-report.ts\` on ${today}.`);
  return out.join("\n");
}

// Main
const queriesPath = findLatest("gsc-queries");
const pagesPath = findLatest("gsc-pages");

if (!queriesPath) {
  console.error(
    "No GSC query CSV found in /reports/.\n" +
      "Export from Google Search Console: Performance → Queries tab → Export → CSV.\n" +
      "Save as /reports/gsc-queries-90d.csv (or similar prefix) and re-run.",
  );
  process.exit(1);
}

console.log(`Parsing queries: ${queriesPath}`);
const queries = parseQueries(queriesPath);

let pages: GscPageRow[] | null = null;
if (pagesPath) {
  console.log(`Parsing pages: ${pagesPath}`);
  pages = parsePages(pagesPath);
}

const report = summarize(queries, pages);
const outPath = resolve(REPORTS_DIR, `gsc-report-${today}.md`);
writeFileSync(outPath, report, "utf-8");
console.log(`Wrote ${outPath} (${report.length.toLocaleString()} bytes)`);
