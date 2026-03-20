/**
 * Generates sitemap.xml from data files at build time.
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { tools, trades } from "../app/data/constructionData";
import { comparisonPages, bestForPages } from "../app/data/seoPages";
import { guidePages } from "../app/data/guidePages";

const BASE_URL = "https://bestconstructionapps.com";
const today = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const entries: SitemapEntry[] = [];

// Homepage
entries.push({ loc: "/", changefreq: "weekly", priority: "1.0", lastmod: today });

// Trade pages
for (const trade of trades) {
  entries.push({
    loc: `/trades/${trade.slug}`,
    changefreq: "weekly",
    priority: "0.9",
    lastmod: today,
  });
}

// Tool pages
for (const tool of tools) {
  entries.push({
    loc: `/tools/${tool.slug}`,
    changefreq: "weekly",
    priority: "0.8",
    lastmod: today,
  });
}

// Comparison pages
for (const page of comparisonPages) {
  entries.push({
    loc: `/compare/${page.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: today,
  });
}

// Best-for pages
for (const page of bestForPages) {
  entries.push({
    loc: `/best/${page.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: today,
  });
}

// Guide pages
for (const guide of guidePages) {
  entries.push({
    loc: `/guides/${guide.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: guide.lastUpdated || today,
  });
}

// Guides index
entries.push({ loc: "/guides", changefreq: "weekly", priority: "0.7", lastmod: today });

// Compare tool page
entries.push({ loc: "/compare", changefreq: "monthly", priority: "0.6", lastmod: today });

// Search page
entries.push({ loc: "/search", changefreq: "monthly", priority: "0.5", lastmod: today });

// Build XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${BASE_URL}${e.loc}</loc>
    <lastmod>${e.lastmod || today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(import.meta.dirname, "..", "dist", "sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Generated sitemap.xml (${entries.length} URLs) → ${outPath}`);
