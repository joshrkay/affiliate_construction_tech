/**
 * Pre-renders static HTML shells for every route with correct <head> metadata.
 * This ensures search engines and AI crawlers see the right title, description,
 * OG tags, and structured data without needing to execute JavaScript.
 *
 * Run after vite build: npx tsx scripts/prerender.ts
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { pathToFileURL } from "url";
import { tools, trades } from "../app/data/constructionData";
import { comparisonPages, bestForPages } from "../app/data/seoPages";
import { comparisonDetailPages } from "../app/data/comparisonData";
import { guidePages } from "../app/data/guidePages";
import { categories } from "../app/data/categoryTaxonomy";
import { categoryPages } from "../app/data/categoryContent";
import { defaultAuthor, defaultDatePublished, defaultDateModified } from "../app/data/editorial";
import { loadBlogPostMeta } from "./lib/blogMeta";

const BASE_URL = "https://bestconstructionapps.com";
const DIST = resolve(import.meta.dirname, "..", "dist");
const template = readFileSync(resolve(DIST, "index.html"), "utf-8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    "dist/index.html is already prerendered — run `vite build` first to regenerate a clean template before running prerender."
  );
}
const currentYear = new Date().getFullYear();

const AUTHOR_SCHEMA = {
  "@type": "Person",
  name: defaultAuthor.name,
  url: defaultAuthor.url,
  jobTitle: defaultAuthor.role,
};

const PUBLISHER_SCHEMA = {
  "@type": "Organization",
  name: "BUILTECH",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/og-default.png`,
  },
};

interface PageMeta {
  path: string;
  title: string;
  description: string;
  ogType?: string;
  canonical: string;
  schemas?: object[];
}

function buildHtml(meta: PageMeta, appHtml: string): string {
  const ogType = meta.ogType || "website";

  // Replace the generic title and description with route-specific ones
  let html = template;
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escHtml(meta.description)}" />`
  );

  // Inject additional head tags before </head>
  const additionalTags = [
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:title" content="${escHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escHtml(meta.description)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    ...(meta.schemas || []).map(
      (s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`
    ),
  ].join("\n    ");
  html = html.replace("</head>", `    ${additionalTags}\n  </head>`);

  // Inject the server-rendered page body so crawlers (including AI crawlers
  // that don't execute JavaScript) see the full content
  if (appHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  }

  return html;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
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
      "description": "The construction industry's AI & software directory. Compare ratings, read contractor reviews, and discover AI tools for every trade.",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/og-default.png`
      },
      "foundingDate": "2026-03-01",
      "knowsAbout": [
        "Construction Software",
        "Construction Management Software",
        "Field Service Software",
        "Construction Estimating Software",
        "AI in Construction",
        "BIM Software",
        "HVAC Software",
        "Plumbing Software",
        "Electrical Contractor Software",
        "Roofing Software"
      ],
      "sameAs": [
        "https://twitter.com/BUILTECH",
        "https://www.linkedin.com/company/builtech",
        "https://www.youtube.com/@BUILTECH"
      ]
    }
  ]
});

// Trade pages
for (const trade of trades) {
  const tradeTools = tools.filter(t => t.tradeIds.includes(trade.id));
  const topTool = [...tradeTools].sort((a, b) => b.rating - a.rating)[0];
  const desc = `Compare the top ${tradeTools.length} ${trade.name} software tools rated by real contractors. Find AI-powered and traditional solutions for ${trade.name} businesses in ${currentYear}.`;
  const tradeCanonical = `${BASE_URL}/trades/${trade.slug}`;
  const tradeFaqs = [
    {
      question: `What is ${trade.name} software?`,
      answer: trade.overview,
    },
    {
      question: `What are the key challenges in ${trade.name}?`,
      answer: trade.challenges.join(". ") + ".",
    },
    {
      question: `Why should ${trade.name} companies use AI software?`,
      answer: trade.whyAI.join(" "),
    },
    {
      question: `What is the best ${trade.name} software in ${currentYear}?`,
      answer: topTool
        ? `The top-rated ${trade.name} software in ${currentYear} is ${topTool.name} with a ${topTool.rating.toFixed(1)}/5 rating from ${topTool.reviewCount.toLocaleString()} reviews. Other top options include ${tradeTools.slice(1, 4).map((t) => t.name).join(", ")}.`
        : `See our ranked list of ${trade.name} software.`,
    },
  ];
  pages.push({
    path: `/trades/${trade.slug}`,
    title: `Best ${trade.name} Software (${currentYear}) — Top AI & Tools | BUILTECH`,
    description: desc,
    canonical: tradeCanonical,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Best ${trade.name} Software (${currentYear})`,
        "description": desc,
        "url": tradeCanonical,
        "mainEntityOfPage": tradeCanonical,
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA,
        "datePublished": defaultDatePublished,
        "dateModified": defaultDateModified
      },
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
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tradeFaqs.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
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

// Comparison detail pages — full static body + FAQPage schema
const detailSlugs = new Set(comparisonDetailPages.map((p) => p.slug));

for (const page of comparisonDetailPages) {
  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.title,
      "description": page.metaDescription,
      "url": `${BASE_URL}/compare/${page.slug}`,
      "author": AUTHOR_SCHEMA,
      "publisher": PUBLISHER_SCHEMA,
      "datePublished": defaultDatePublished,
      "dateModified": defaultDateModified
    }
  ];

  if (page.faqs && page.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
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

// Remaining comparison pages from seoPages (no detail page)
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
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA
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
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA,
        "datePublished": defaultDatePublished,
        "dateModified": defaultDateModified
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
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA,
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
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA,
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
      "publisher": PUBLISHER_SCHEMA,
      "dateModified": defaultDateModified
    }
  ]
});

// Blog posts
const blogPosts = loadBlogPostMeta();
for (const post of blogPosts) {
  pages.push({
    path: `/blog/${post.slug}`,
    title: `${post.title} | BUILTECH`,
    description: post.description,
    ogType: "article",
    canonical: `${BASE_URL}/blog/${post.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "url": `${BASE_URL}/blog/${post.slug}`,
        "mainEntityOfPage": `${BASE_URL}/blog/${post.slug}`,
        "author": AUTHOR_SCHEMA,
        "publisher": PUBLISHER_SCHEMA,
        "datePublished": post.date,
        "dateModified": post.date
      }
    ]
  });
}

// Blog index
pages.push({
  path: "/blog",
  title: `Construction Tech Blog — News, Reviews & Buying Advice | BUILTECH`,
  description: "Practical articles on construction software, AI tools, pricing, and buying decisions — written for contractors, estimators, and project managers.",
  canonical: `${BASE_URL}/blog`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "BUILTECH Construction Tech Blog",
      "url": `${BASE_URL}/blog`,
      "publisher": PUBLISHER_SCHEMA
    }
  ]
});

// Pricing pages
for (const tool of tools) {
  const isCustom = /custom|contact/i.test(tool.price);
  pages.push({
    path: `/pricing/${tool.slug}`,
    title: `${tool.name} Pricing (${currentYear}) — Cost, Plans & Cheaper Alternatives | BUILTECH`,
    description: `${tool.name} pricing in ${currentYear}: starts at ${tool.price}. ${tool.priceNote}`,
    ogType: "article",
    canonical: `${BASE_URL}/pricing/${tool.slug}`,
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much does ${tool.name} cost?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": isCustom
                ? `${tool.name} does not publish list pricing — quotes are custom per company. ${tool.priceNote}`
                : `${tool.name} starts at ${tool.price}. ${tool.priceNote}`
            }
          }
        ]
      }
    ]
  });
}

// Pricing index
pages.push({
  path: "/pricing",
  title: `Construction Software Pricing Index (${currentYear}) — Real Starting Prices | BUILTECH`,
  description: `Starting prices and pricing models for ${tools.length} construction software tools in one table — project management, estimating, field service, and more.`,
  canonical: `${BASE_URL}/pricing`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": `Construction Software Pricing Index (${currentYear})`,
      "description": `Starting prices and pricing models for ${tools.length} construction software tools, maintained by BUILTECH.`,
      "url": `${BASE_URL}/pricing`,
      "creator": PUBLISHER_SCHEMA,
      "license": `${BASE_URL}/about`
    }
  ]
});

// Top Rated page
pages.push({
  path: "/top-rated",
  title: `Top Rated Construction Software This Month (${currentYear}) | BUILTECH`,
  description: "The highest-rated construction software and AI tools this month, ranked by contractor ratings across every trade.",
  canonical: `${BASE_URL}/top-rated`,
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

// About page (E-E-A-T anchor)
pages.push({
  path: "/about",
  title: `About BUILTECH — Who We Are & How We Evaluate Construction Software`,
  description: `BUILTECH is an independent construction technology directory tracking ${tools.length}+ software tools and AI platforms across ${trades.length} trades. Learn how we source ratings, evaluate tools, and keep the directory current.`,
  ogType: "website",
  canonical: `${BASE_URL}/about`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About BUILTECH",
      "url": `${BASE_URL}/about`,
      "description": `Independent construction technology directory covering ${tools.length}+ software tools across ${trades.length} trades.`,
      "publisher": PUBLISHER_SCHEMA
    }
  ]
});

// Methodology page (E-E-A-T anchor)
pages.push({
  path: "/methodology",
  title: `BUILTECH Methodology — How We Evaluate Construction Software`,
  description: `How BUILTECH sources ratings, scores tools, handles affiliate relationships, and keeps listings current across ${tools.length}+ construction software and AI platforms.`,
  ogType: "article",
  canonical: `${BASE_URL}/methodology`,
  schemas: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "BUILTECH Methodology",
      "description": `How BUILTECH sources ratings, scores tools, handles affiliate relationships, and keeps listings current.`,
      "url": `${BASE_URL}/methodology`,
      "mainEntityOfPage": `${BASE_URL}/methodology`,
      "author": AUTHOR_SCHEMA,
      "publisher": PUBLISHER_SCHEMA,
      "datePublished": defaultDatePublished,
      "dateModified": defaultDateModified
    }
  ]
});

// Generate all pages with full server-rendered bodies
const serverEntry = pathToFileURL(resolve(import.meta.dirname, "..", "dist-server", "entry-server.js")).href;
const { render } = await import(serverEntry);

let count = 0;
let failed = 0;
for (const page of pages) {
  let appHtml = "";
  try {
    appHtml = await render(page.path);
  } catch (err) {
    failed++;
    console.error(`SSR failed for ${page.path}: ${(err as Error).message}`);
  }
  const html = buildHtml(page, appHtml);
  writePage(page.path, html);
  count++;
}

console.log(`Pre-rendered ${count} pages (full HTML bodies${failed ? `, ${failed} SSR failures` : ""}) → ${DIST}`);
if (failed > 0) process.exit(1);
