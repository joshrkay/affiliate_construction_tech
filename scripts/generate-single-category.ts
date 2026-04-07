#!/usr/bin/env npx tsx
/**
 * Generate single category using local Ollama
 *
 * Optimized prompts for gemma4/llama3.1
 * Outputs TypeScript category object
 *
 * Usage:
 *   npx tsx scripts/generate-single-category.ts \
 *     --category=project-scheduling \
 *     --language=en \
 *     --model=gemma4 \
 *     --ollama-url=http://localhost:11434
 */

import Anthropic from "@anthropic-ai/sdk";

const args = process.argv.slice(2).reduce(
  (acc, arg) => {
    const [key, value] = arg.split("=");
    acc[key.replace("--", "")] = value;
    return acc;
  },
  {} as Record<string, string>
);

const CATEGORY = args.category;
const LANGUAGE = (args.language || "en") as "en" | "es";
const MODEL = args.model || "gemma4";
const OLLAMA_URL = args["ollama-url"] || "http://localhost:11434/v1";

if (!CATEGORY) {
  console.error("❌ Missing --category");
  process.exit(1);
}

// Map category ID to human-readable name
const categoryNames: Record<string, string> = {
  "financial-management": "Financial Management",
  "job-costing": "Job Costing",
  "payroll-management": "Payroll Management",
  "time-tracking": "Time Tracking",
  "change-order-management": "Change Order Management",
  "rfi-management": "RFI Management",
  "safety-compliance": "Safety Compliance",
  "warranty-management": "Warranty Management",
  "compliance-documentation": "Compliance Documentation",
  "customer-reviews": "Customer Reviews",
};

const categoryName = categoryNames[CATEGORY] || CATEGORY;
const slug = CATEGORY;

console.log(`\n📝 Generating: ${categoryName} (${LANGUAGE.toUpperCase()})`);
console.log(`Model: ${MODEL} | Ollama: ${OLLAMA_URL}`);

const client = new Anthropic({
  apiKey: "ollama",
  baseURL: OLLAMA_URL,
});

async function callOllama(prompt: string): Promise<string> {
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === "text") {
      return content.text.trim();
    }

    throw new Error(`Unexpected response type: ${content.type}`);
  } catch (error) {
    console.error("❌ Ollama error:", error);
    throw error;
  }
}

async function generate() {
  try {
    // Generate title & meta
    console.log("  → Title & Meta");
    const titleMeta = await callOllama(`
Generate JSON with title, metaDescription, and h1 for a ${categoryName} software page.

${
  LANGUAGE === "es"
    ? `
Language: Spanish
Translate naturally - not word-for-word.
Use construction industry Spanish terminology.

Examples:
- "construcción" not "edificio"
- "presupuestos" not "estimación"
- "cuadrilla" not "grupo"
`
    : ""
}

Return valid JSON only:
{
  "title": "60-char title with primary keyword",
  "metaDescription": "160-char description",
  "h1": "benefit-focused headline"
}
`);

    const titleObj = JSON.parse(titleMeta);

    // Generate introduction
    console.log("  → Introduction");
    const introduction = await callOllama(`
Write 150-200 word introduction for ${categoryName} software page.

Hook: Real contractor problem with this task
Explain: Business impact (time/money/stress)
List: 3-4 benefits of using software
Result: What they get (faster, cheaper, easier)

Use HTML. No buzzwords. Specific numbers.
Return HTML only (no JSON).
`);

    // Generate Why It Matters
    console.log("  → Why It Matters");
    const whyItMatters = await callOllama(`
Write 100-150 word "Why It Matters" section for ${categoryName}.

Include:
1. Financial impact (dollars wasted or tied up)
2. Downstream business effects
3. Why contractors must care

Examples: "$75K-100K tied up in unpaid invoices"

Use HTML. Return HTML only.
`);

    // Generate 7 sections
    console.log("  → 7 Sections");
    const sections = [
      {
        heading: `What Is ${categoryName}?`,
        prompt: `Write 250-400 word section "What Is ${categoryName}?"

Explain:
1. Definition (1 sentence, plain English)
2. Difference from manual/spreadsheet approach with real example
3. Key benefits (3-4 bulleted)
4. Time/effort saved (specific: "save 10 hours/week")

Use HTML with <p> and <ul>. No buzzwords.`,
      },
      {
        heading: `The Real Cost of Manual ${categoryName}`,
        prompt: `Write 300-400 word cost analysis section.

Show real costs to contractors:
1. Time cost: hours/week × $20-40/hr = $/year
2. Money cost: cash tied up or lost
3. Stress/risk cost
4. Total cost - software cost = ROI

Use specific numbers. HTML format.`,
      },
      {
        heading: `${categoryName} vs Manual Methods`,
        prompt: `Write 250-350 word comparison.

Answer: "Do contractors really need this software?"
1. When spreadsheets ARE fine (be honest)
2. When spreadsheets break down
3. Breaking point: what triggers the need
4. Conclusion: if they're reading this, they probably need it

Use lists. HTML format.`,
      },
      {
        heading: `Key Features to Compare`,
        prompt: `Write 300-400 word features section.

List 4-5 features with:
- Feature name (bold)
- What it is (1 sentence)
- Why it matters to contractors (1-2 sentences)
- Real contractor example or impact

HTML format with bold feature names.`,
      },
      {
        heading: `How to Choose ${categoryName} Software`,
        prompt: `Write 400-500 word decision framework.

List 4-5 evaluation criteria (most important first):
For each:
- Criterion (question format)
- What it is (1 sentence)
- Why it matters (1-2 sentences)
- Contractor impact if you skip it

Example: "Does it integrate with your accounting system?"

HTML format.`,
      },
      {
        heading: `Top ${categoryName} Software (2025)`,
        prompt: `Write 400-600 word tool recommendations (3 tools).

For each tool:
**[Tool] for [Contractor Type]**

Best for: (1 sentence, specific contractor)
Why: (2-3 sentences, specific reasons, not marketing)
Pricing: (annual cost, e.g., "$99-299/month")
Limitation: (honest weakness, who should avoid)

Use tool names: Procore, Buildertrend, Jobber (examples)

HTML format with bold tool names.`,
      },
      {
        heading: `${categoryName} Software Pricing & ROI`,
        prompt: `Write 250-400 word pricing and ROI section.

Include:
1. Cost table (3 tools, annual costs)
2. ROI scenario: contractor at $500K-$3M revenue
3. Hidden costs (setup, training, integration)
4. Payback period (when it pays for itself)

Example ROI:
- Time saved: 10 hours/week = $20K/year
- Disputes prevented: 1 = $10K saved
- Cost: $2K/year
- Net: $28K/year saved

HTML format.`,
      },
    ];

    const generatedSections = [];
    for (const section of sections) {
      process.stdout.write(".");
      const content = await callOllama(section.prompt);
      generatedSections.push({
        heading: section.heading,
        content: content,
        type: "text",
      });
    }
    console.log("");

    // Generate FAQs
    console.log("  → FAQs (7 questions)");
    const faqsText = await callOllama(`
Generate 7 FAQs for ${categoryName} software.

Cover these stages:
- Awareness (1-2): "Do I need this?"
- Consideration (2-3): "Cost? How long? Switching?"
- Decision (1-2): "Which tool? Will team use?"

Format:
Q: Question?
A: Answer (50-100 words)

Repeat 7 times.
`);

    // Parse FAQs
    const faqLines = faqsText.split("\n").filter((l) => l.trim());
    const faqs = [];
    for (let i = 0; i < faqLines.length; i += 2) {
      if (faqLines[i] && faqLines[i + 1]) {
        faqs.push({
          question: faqLines[i].replace(/^Q:\s*/, "").trim(),
          answer: faqLines[i + 1].replace(/^A:\s*/, "").trim(),
        });
      }
    }

    // Generate keywords
    console.log("  → Keywords (10)");
    const keywordsText = await callOllama(`
Generate 10 keywords for ${categoryName} software page.

Include keywords for:
- Awareness: "what is", definition
- Consideration: "how to choose", "vs", "best"
- Decision: "pricing", "software", specific tools

Primary keyword should be first.
Format: keyword1, keyword2, keyword3...
`);

    const keywords = keywordsText
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k)
      .slice(0, 10);

    // Generate related categories
    console.log("  → Related categories (3)");
    const relatedText = await callOllama(`
What 3 construction software categories are related to ${categoryName}?

Return comma-separated category slugs only, like:
project-scheduling, financial-management, time-tracking
`);

    const relatedCategories = relatedText
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c && c !== slug)
      .slice(0, 3);

    // Build TypeScript object
    const categoryObj = {
      slug,
      categoryId: CATEGORY,
      language: LANGUAGE,
      title: titleObj.title,
      metaDescription: titleObj.metaDescription,
      h1: titleObj.h1,
      introduction,
      whyItMatters,
      toolsToCompare: ["procore", "buildertrend", "jobber"],
      comparisonTableColumns: [
        { key: "feature-1", label: "Feature 1" },
        { key: "feature-2", label: "Feature 2" },
        { key: "feature-3", label: "Feature 3" },
        { key: "feature-4", label: "Feature 4" },
        { key: "feature-5", label: "Feature 5" },
      ],
      sections: generatedSections,
      primaryCTA: `Start with ${categoryName}`,
      primaryToolId: "procore",
      secondaryToolIds: ["buildertrend", "jobber"],
      keywords,
      faqs: faqs.slice(0, 7),
      relatedCategories,
      published: true,
      featured: true,
      lastUpdated: new Date().toISOString(),
    };

    console.log("\n✅ Generated successfully!");
    console.log(`\nCategory object (copy to categoryContent.ts):\n`);
    console.log(JSON.stringify(categoryObj, null, 2));
  } catch (error) {
    console.error("\n❌ Generation failed:", error);
    process.exit(1);
  }
}

generate();
