/**
 * Generates RSS feed (feed.xml) from guide data at build time.
 * Run: npx tsx scripts/generate-feed.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { guidePages } from "../app/data/guidePages";

const BASE_URL = "https://bestconstructionapps.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Sort guides by lastUpdated descending
const sorted = [...guidePages].sort(
  (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
);

const items = sorted.map((guide) => {
  const pubDate = new Date(guide.lastUpdated).toUTCString();
  return `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${BASE_URL}/guides/${guide.slug}</link>
      <description>${escapeXml(guide.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${BASE_URL}/guides/${guide.slug}</guid>
      <category>${escapeXml(guide.category)}</category>
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
