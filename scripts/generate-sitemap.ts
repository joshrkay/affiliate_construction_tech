/**
 * Generates sitemap.xml from data files at build time.
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { tools, trades } from "../app/data/constructionData";
import { comparisonPages, bestForPages } from "../app/data/seoPages";
import { comparisonDetailPages } from "../app/data/comparisonData";
import { guidePages } from "../app/data/guidePages";
import { categoryPages } from "../app/data/categoryContent";
import { loadBlogPostMeta } from "./lib/blogMeta";
import { defaultDateModified } from "../app/data/editorial";

const BASE_URL = "https://bestconstructionapps.com";
// Pages only claim a new modification date when editorial content actually changes.
const today = defaultDateModified;

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

// Tool pages (duplicates canonicalize elsewhere and are left out)
for (const tool of tools) {
  if (tool.duplicateOf) continue;
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

// Editorial comparison pages not covered by seoPages
const seoComparisonSlugs = new Set(comparisonPages.map((p) => p.slug));
for (const page of comparisonDetailPages) {
  if (seoComparisonSlugs.has(page.slug)) continue;
  entries.push({
    loc: `/compare/${page.slug}`,
    changefreq: "monthly",
    priority: "0.7",
    lastmod: page.lastUpdated || today,
  });
}

// Blog posts
for (const post of loadBlogPostMeta()) {
  entries.push({
    loc: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: post.date,
  });
}

// Blog index
entries.push({ loc: "/blog", changefreq: "weekly", priority: "0.7", lastmod: today });

// Best-for pages
entries.push({ loc: "/best", changefreq: "monthly", priority: "0.7", lastmod: today });
for (const page of bestForPages) {
  entries.push({
    loc: `/best/${page.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: today,
  });
}

// Category pages
entries.push({ loc: "/categories", changefreq: "monthly", priority: "0.6", lastmod: today });
for (const page of categoryPages) {
  entries.push({
    loc: `/categories/${page.slug}`,
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

// Pricing pages
for (const tool of tools) {
  if (tool.duplicateOf) continue;
  entries.push({
    loc: `/pricing/${tool.slug}`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: today,
  });
}
entries.push({ loc: "/pricing", changefreq: "weekly", priority: "0.8", lastmod: today });

// Top rated page
entries.push({ loc: "/top-rated", changefreq: "weekly", priority: "0.7", lastmod: today });

// Cost calculator
entries.push({ loc: "/cost-calculator", changefreq: "monthly", priority: "0.7", lastmod: today });

// Updates page
entries.push({ loc: "/updates", changefreq: "weekly", priority: "0.6", lastmod: today });

// Search page
entries.push({ loc: "/search", changefreq: "monthly", priority: "0.5", lastmod: today });

// About & Methodology (E-E-A-T pages)
entries.push({ loc: "/about", changefreq: "monthly", priority: "0.6", lastmod: today });
entries.push({ loc: "/methodology", changefreq: "monthly", priority: "0.6", lastmod: today });
entries.push({ loc: "/privacy", changefreq: "yearly", priority: "0.2", lastmod: today });
entries.push({ loc: "/terms", changefreq: "yearly", priority: "0.2", lastmod: today });

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
