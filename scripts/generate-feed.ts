/**
 * Generates RSS feed (feed.xml) from guide data at build time.
 * Run: npx tsx scripts/generate-feed.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { guidePages } from "../app/data/guidePages";
import { loadBlogPostMeta } from "./lib/blogMeta";

const BASE_URL = "https://bestconstructionapps.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Merge guides and blog posts, sorted by date descending
const feedEntries = [
  ...guidePages.map((g) => ({
    title: g.title,
    link: `${BASE_URL}/guides/${g.slug}`,
    description: g.description,
    date: g.lastUpdated,
    category: g.category,
  })),
  ...loadBlogPostMeta().map((p) => ({
    title: p.title,
    link: `${BASE_URL}/blog/${p.slug}`,
    description: p.description,
    date: p.date,
    category: "Blog",
  })),
];

const sorted = feedEntries.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const items = sorted.map((entry) => {
  const pubDate = new Date(entry.date).toUTCString();
  return `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${entry.link}</link>
      <description>${escapeXml(entry.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${entry.link}</guid>
      <category>${escapeXml(entry.category)}</category>
    </item>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BUILTECH — Construction Software Guides</title>
    <link>${BASE_URL}/guides</link>
    <description>In-depth guides on construction software, AI technology, estimating, project management, and implementation for contractors and construction professionals.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join("\n")}
  </channel>
</rss>
`;

const outPath = resolve(import.meta.dirname, "..", "dist", "feed.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`Generated feed.xml (${sorted.length} items) → ${outPath}`);
