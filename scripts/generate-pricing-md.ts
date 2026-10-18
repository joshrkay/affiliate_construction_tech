/**
 * Generates /pricing.md — a plain-Markdown pricing table that AI agents and
 * LLM crawlers can parse without rendering JavaScript.
 * Run after vite build: npx tsx scripts/generate-pricing-md.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { tools, trades } from "../app/data/constructionData";
import { defaultDateModified } from "../app/data/editorial";

const BASE_URL = "https://bestconstructionapps.com";
const DIST = resolve(import.meta.dirname, "..", "dist");

const tradeName = (id: string) => trades.find((t) => t.id === id)?.name ?? id;
const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();

const rows = tools
  .filter((t) => !t.duplicateOf)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(
    (t) =>
      `| [${esc(t.name)}](${BASE_URL}/pricing/${t.slug}) | ${esc(t.price)} | ${esc(t.priceNote)} | ${t.rating.toFixed(1)} (${t.reviewCount.toLocaleString()}) | ${t.tradeIds.slice(0, 3).map(tradeName).join(", ")} |`
  );

const md = `# Construction Software Pricing — BUILTECH

> Starting prices for ${rows.length} construction software tools, collected from vendor websites and aggregated contractor ratings. Last reviewed ${defaultDateModified}. Source: ${BASE_URL}/pricing

Prices are USD list prices as published by each vendor at the time of review. "Custom" or "Contact for pricing" means the vendor quotes per company. Each row links to a page with plan details, hidden costs, and cheaper alternatives.

| Tool | Starting price | Pricing model | Rating (reviews) | Primary trades |
|------|----------------|---------------|------------------|----------------|
${rows.join("\n")}

## How to cite

Link to the per-tool pricing page (for example ${BASE_URL}/pricing/jobber) so readers can see the date and the full breakdown. Methodology: ${BASE_URL}/methodology
`;

writeFileSync(resolve(DIST, "pricing.md"), md, "utf-8");
console.log(`Generated pricing.md (${rows.length} tools) → ${DIST}/pricing.md`);
