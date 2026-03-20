/**
 * Generates llms-full.txt — a complete structured text export of all site content
 * for AI model consumption. Run at build time: npx tsx scripts/generate-llms-full.ts
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { tools, trades } from "../app/data/constructionData";
import { comparisonPages, bestForPages } from "../app/data/seoPages";
import { guidePages } from "../app/data/guidePages";

const BASE_URL = "https://bestconstructionapps.com";
const lines: string[] = [];

function emit(line = "") {
  lines.push(line);
}

// Header
emit("# BUILTECH — Complete Construction Software Directory");
emit("");
emit(`> This file contains the full structured data for all ${tools.length} tools, ${trades.length} trades, ${comparisonPages.length} comparisons, ${bestForPages.length} best-for pages, and ${guidePages.length} guides listed on ${BASE_URL}.`);
emit("");
emit(`Last generated: ${new Date().toISOString().slice(0, 10)}`);
emit("");

// ── TOOLS ──
emit("---");
emit("");
emit(`## Tools (${tools.length} total)`);
emit("");

for (const tool of tools) {
  emit(`### ${tool.name}`);
  emit("");
  emit(`- **URL:** ${BASE_URL}/tools/${tool.slug}`);
  emit(`- **Category:** ${tool.category}`);
  emit(`- **Type:** ${tool.type}`);
  emit(`- **Rating:** ${tool.rating.toFixed(1)}/5 (${tool.reviewCount.toLocaleString()} reviews)`);
  emit(`- **Price:** ${tool.price}${tool.priceNote ? ` — ${tool.priceNote}` : ""}`);
  emit(`- **Year Founded:** ${tool.yearFounded}`);
  emit(`- **Company Size:** ${tool.companySize}`);
  emit(`- **Verified:** ${tool.verified ? "Yes" : "No"}`);
  emit(`- **Tagline:** ${tool.tagline}`);
  emit(`- **Description:** ${tool.description}`);
  emit("");

  if (tool.features.length > 0) {
    emit("**Features:**");
    for (const f of tool.features) {
      emit(`- ${f}`);
    }
    emit("");
  }

  if (tool.pros.length > 0) {
    emit("**Pros:**");
    for (const p of tool.pros) {
      emit(`- ${p}`);
    }
    emit("");
  }

  if (tool.cons.length > 0) {
    emit("**Cons:**");
    for (const c of tool.cons) {
      emit(`- ${c}`);
    }
    emit("");
  }

  const toolTrades = trades.filter((t) => tool.tradeIds.includes(t.id));
  if (toolTrades.length > 0) {
    emit(`**Trades:** ${toolTrades.map((t) => t.name).join(", ")}`);
    emit("");
  }
}

// ── TRADES ──
emit("---");
emit("");
emit(`## Trades (${trades.length} total)`);
emit("");

for (const trade of trades) {
  const tradeTools = tools.filter((t) => t.tradeIds.includes(trade.id));
  emit(`### ${trade.emoji} ${trade.name}`);
  emit("");
  emit(`- **URL:** ${BASE_URL}/trades/${trade.slug}`);
  emit(`- **Tagline:** ${trade.tagline}`);
  emit(`- **Description:** ${trade.description}`);
  emit(`- **Tools count:** ${tradeTools.length}`);
  emit("");
  emit("**Overview:**");
  emit(trade.overview);
  emit("");

  if (trade.challenges.length > 0) {
    emit("**Key Challenges:**");
    for (const c of trade.challenges) {
      emit(`- ${c}`);
    }
    emit("");
  }

  if (trade.whyAI.length > 0) {
    emit("**Why AI Helps:**");
    for (const a of trade.whyAI) {
      emit(`- ${a}`);
    }
    emit("");
  }

  if (tradeTools.length > 0) {
    emit("**Top Tools:**");
    for (const t of tradeTools.sort((a, b) => b.rating - a.rating).slice(0, 5)) {
      emit(`- ${t.name} (${t.rating.toFixed(1)}/5, ${t.price})`);
    }
    emit("");
  }
}

// ── COMPARISONS ──
emit("---");
emit("");
emit(`## Comparisons (${comparisonPages.length} total)`);
emit("");

for (const page of comparisonPages) {
  const [toolA, toolB] = page.tools.map((id) => tools.find((t) => t.id === id));
  emit(`### ${page.title}`);
  emit("");
  emit(`- **URL:** ${BASE_URL}/compare/${page.slug}`);
  emit(`- **Description:** ${page.description}`);
  if (toolA && toolB) {
    emit(`- **${toolA.name}:** ${toolA.rating.toFixed(1)}/5, ${toolA.price}`);
    emit(`- **${toolB.name}:** ${toolB.rating.toFixed(1)}/5, ${toolB.price}`);
  }
  emit("");
}

// ── BEST-FOR PAGES ──
emit("---");
emit("");
emit(`## Best-For Pages (${bestForPages.length} total)`);
emit("");

for (const page of bestForPages) {
  emit(`### ${page.title}`);
  emit("");
  emit(`- **URL:** ${BASE_URL}/best/${page.slug}`);
  emit(`- **Description:** ${page.description}`);
  const trade = trades.find((t) => t.id === page.tradeId);
  if (trade) {
    emit(`- **Trade:** ${trade.name}`);
  }
  emit("");
}

// ── GUIDES ──
emit("---");
emit("");
emit(`## Guides (${guidePages.length} total)`);
emit("");

for (const guide of guidePages) {
  emit(`### ${guide.title}`);
  emit("");
  emit(`- **URL:** ${BASE_URL}/guides/${guide.slug}`);
  emit(`- **Category:** ${guide.category}`);
  emit(`- **Last Updated:** ${guide.lastUpdated}`);
  emit(`- **Description:** ${guide.description}`);
  emit("");

  for (const section of guide.sections) {
    emit(`**${section.heading}**`);
    emit(section.content);
    emit("");
  }

  if (guide.faqs.length > 0) {
    emit("**FAQs:**");
    for (const faq of guide.faqs) {
      emit(`- **Q:** ${faq.question}`);
      emit(`  **A:** ${faq.answer}`);
    }
    emit("");
  }
}

// Write output
const output = lines.join("\n");
const outPath = resolve(import.meta.dirname, "..", "dist", "llms-full.txt");
writeFileSync(outPath, output, "utf-8");
console.log(`Generated llms-full.txt (${(output.length / 1024).toFixed(1)} KB) → ${outPath}`);
