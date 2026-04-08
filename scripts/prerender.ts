/**
 * Pre-renders static HTML shells for every route with correct <head> metadata.
 * This ensures search engines and AI crawlers see the right title, description,
 * OG tags, and structured data without needing to execute JavaScript.
 *
 * Run after vite build: npx tsx scripts/prerender.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { tools, trades } from "../app/data/constructionData";
import { comparisonPages, bestForPages } from "../app/data/seoPages";
import { comparisonDetailPages } from "../app/data/comparisonData";
import { guidePages } from "../app/data/guidePages";
import { categories } from "../app/data/categoryTaxonomy";
import { categoryPages } from "../app/data/categoryContent";

const BASE_URL = "https://bestconstructionapps.com";
const DIST = resolve(import.meta.dirname, "..", "dist");
const template = readFileSync(resolve(DIST, "index.html"), "utf-8");
const currentYear = new Date().getFullYear();

interface PageMeta {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  canonical: string;
  schemas?: object[];
}

function buildHtml(meta: PageMeta): string {
  const ogType = meta.ogType || "website";

  const headTags = [
    `<title>${meta.title}</title>`,
    `<meta name="description" content="${escHtml(meta.description)}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${escHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escHtml(meta.description)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
  ];

  if (meta.schemas) {
    for (const schema of meta.schemas) {
      headTags.push(
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
      );
    }
  }

  const injection = headTags.join("\n    ");

  // Replace the generic title and description with route-specific ones
  let html = template;
  // Replace the existing title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );
  // Replace the existing description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escHtml(meta.description)}" />`
  );
  // Inject additional head tags before </head>
  const additionalTags = [
    `<link rel="canonical" href="${meta.canonical}" />`,
    ...(meta.schemas || []).map(
      (s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    ),
  ].join("\n    ");
  html = html.replace("</head>", `    ${additionalTags}\n  </head>`);

  return html;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function writePage(routePath: string, html: string) {
  const filePath = routePath === "/"
    ? resolve(DIST, "index.html")
    : resolve(DIST, routePath.slice(1), "index.html");
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, html, "utf-8");
}

const pages: PageMeta[] = [];

// Homepage (already has index.html, but we'll update it with schemas)
pages.push({
  path: "/",
  title: `BUILTECH — Best AI & Construction Software Directory (${currentYear})`,
  description: "Compare 140+ construction software tools rated by real contractors. Find the best AI-powered estimating, project management, field service, and scheduling software for your trade.",
  canonical: `${BASE_URL}/`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BUILTECH",
      "url": BASE_URL,
      "description": "The construction industry's AI & software directory.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BUILTECH",
      "url": BASE_URL,
      "description": "The construction industry's AI & software directory. Compare ratings, read contractor reviews, and discover AI tools for every trade."
    }
  ]
});

// Trade pages
for (const trade of trades) {
  const tradeTools = tools.filter(t => t.tradeIds.includes(trade.id));
  const desc = `Compare the top ${tradeTools.length} ${trade.name} software tools rated by real contractors. Find AI-powered and traditional solutions for ${trade.name} businesses in ${currentYear}.`;
  pages.push({
    path: `/trades/${trade.slug}`,
    title: `Best ${trade.name} Software (${currentYear}) — Top AI & Tools | BUILTECH`,
    description: desc,
    canonical: `${BASE_URL}/trades/${trade.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Best ${trade.name} Software (${currentYear})`,
        "description": desc,
        "numberOfItems": tradeTools.length,
        "itemListOrder": "https://schema.org/ItemListOrderDescending",
        "itemListElement": tradeTools
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10)
          .map((t, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": t.name,
            "url": `${BASE_URL}/tools/${t.slug}`
          }))
      }
    ]
  });
}

// Tool pages
for (const tool of tools) {
  const desc = `${tool.name} is rated ${tool.rating.toFixed(1)}/5 by ${tool.reviewCount.toLocaleString()} contractors. ${tool.tagline}. Starting at ${tool.price}.`;
  pages.push({
    path: `/tools/${tool.slug}`,
    title: `${tool.name} Review (${currentYear}) — Pricing, Features & Ratings | BUILTECH`,
    description: desc,
    ogType: "product",
    canonical: `${BASE_URL}/tools/${tool.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": "BusinessApplication",
        "url": tool.website,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating.toFixed(1),
          "bestRating": "5",
          "ratingCount": tool.reviewCount
        },
        "offers": {
          "@type": "Offer",
          "price": tool.price.replace(/[^0-9.]/g, "") || "0",
          "priceCurrency": "USD"
        }
      }
    ]
  });
}

// Comparison detail pages (rich schema with FAQPage)
for (const page of comparisonDetailPages) {
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.title,
      "description": page.metaDescription,
      "url": `${BASE_URL}/compare/${page.slug}`,
      "author": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
      "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL }
    }
  ];

  if (page.faqs && page.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  pages.push({
    path: `/compare/${page.slug}`,
    title: page.title,
    description: page.metaDescription,
    ogType: "article",
    canonical: `${BASE_URL}/compare/${page.slug}`,
    schemas
  });
}

// Remaining comparison pages from seoPages (not in comparisonDetailPages)
const detailSlugs = new Set(comparisonDetailPages.map((p) => p.slug));
for (const page of comparisonPages) {
  if (detailSlugs.has(page.slug)) continue;
  pages.push({
    path: `/compare/${page.slug}`,
    title: page.title,
    description: page.description,
    ogType: "article",
    canonical: `${BASE_URL}/compare/${page.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": page.title,
        "description": page.description,
        "url": `${BASE_URL}/compare/${page.slug}`,
        "author": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL }
      }
    ]
  });
}

// Best-for pages
for (const page of bestForPages) {
  pages.push({
    path: `/best/${page.slug}`,
    title: page.title,
    description: page.description,
    ogType: "article",
    canonical: `${BASE_URL}/best/${page.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.title,
        "description": page.description,
        "author": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "datePublished": "2026-03-11",
        "dateModified": "2026-03-13"
      }
    ]
  });
}

// Category pages
for (const page of categoryPages) {
  pages.push({
    path: `/categories/${page.slug}`,
    title: page.title,
    description: page.metaDescription,
    ogType: "article",
    canonical: `${BASE_URL}/categories/${page.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": page.title,
        "description": page.metaDescription,
        "author": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "datePublished": page.lastUpdated,
        "dateModified": page.lastUpdated,
        "keywords": page.keywords.join(", ")
      }
    ]
  });
}

// Guide pages
for (const guide of guidePages) {
  pages.push({
    path: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
    ogType: "article",
    canonical: `${BASE_URL}/guides/${guide.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": guide.title,
        "description": guide.description,
        "author": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL },
        "datePublished": guide.lastUpdated,
        "dateModified": guide.lastUpdated
      }
    ]
  });
}

// Guides index
pages.push({
  path: "/guides",
  title: `Construction Software Guides & Resources | BUILTECH`,
  description: "In-depth guides on construction software, AI technology, estimating, project management, and implementation. Written for contractors and construction professionals.",
  canonical: `${BASE_URL}/guides`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `Construction Software Guides & Resources (${currentYear})`,
      "description": "In-depth guides on construction software, AI technology, and implementation.",
      "url": `${BASE_URL}/guides`,
      "publisher": { "@type": "Organization", "name": "BUILTECH", "url": BASE_URL }
    }
  ]
});

// Compare page
pages.push({
  path: "/compare",
  title: `Compare Construction Software Side by Side | BUILTECH`,
  description: "Compare construction software tools side by side. Features, pricing, ratings, and reviews to help you choose the right platform for your trade.",
  canonical: `${BASE_URL}/compare`,
});

// Search page
pages.push({
  path: "/search",
  title: `Search Construction Software & AI Tools | BUILTECH`,
  description: "Search and discover 140+ construction software tools. Find the best solutions for your trade by features, price, and ratings.",
  canonical: `${BASE_URL}/search`,
});

// Generate all pages
let count = 0;
for (const page of pages) {
  const html = buildHtml(page);
  writePage(page.path, html);
  count++;
}

console.log(`Pre-rendered ${count} pages with SEO metadata → ${DIST}`);
