# Category Content Generation Prompts

## Overview

This guide contains 6-8 standalone prompts that can be used with Claude to generate content for the remaining construction software categories. Each prompt is self-contained and can be run independently.

**How to use:**
1. Copy a prompt
2. Paste it into Claude
3. Follow any specific instructions in the prompt
4. The output will be formatted TypeScript that you can copy directly into your categoryContent.ts file

---

## Prompt 1: Generate Category Overview & Introduction

**Use this to:** Create the overview text, key feature bullets, and introduction paragraphs for a new category.

```
I'm building an affiliate software review site for construction contractors. I need help writing content for a new software category.

Category: {CATEGORY_NAME}
Description: {CATEGORY_DESCRIPTION}
Primary Keyword: {PRIMARY_KEYWORD}
Top Tools for this Category: {TOOL_NAMES}

Please write:

1. A 2-3 sentence "Why This Matters" introduction paragraph that explains why contractors need software for this category. Focus on the business impact (time saved, money saved, profitability impact).

2. A "Key Features to Look For" section with 4-5 bullet points describing the most important features to evaluate. Format each as **Feature Name:** description.

3. A "How Much Time & Money Can You Save?" section with realistic numbers/percentages for:
   - Time savings (%)
   - Cost/accuracy improvements (%)
   - Revenue impact ($)

Keep the tone professional but conversational. Focus on contractor pain points and ROI. Each section should be 1-2 short paragraphs.

Output as a TypeScript object with keys: whyMatters, keyFeatures, savingsSection

Format keyFeatures as an array of strings with the bullet point text.
```

---

## Prompt 2: Generate FAQ Content

**Use this to:** Create 3-5 FAQs for a category page. These are crucial for SEO (FAQ schema) and user engagement.

```
I'm creating FAQ content for a software category page. The FAQs should answer common questions contractors ask about this software category.

Category: {CATEGORY_NAME}
Top Tools: {TOOL_NAMES}
Primary Keyword: {PRIMARY_KEYWORD}

Generate 4-5 frequently asked questions and answers for this category. Each question should:
- Start with "What is...", "How do...", "Can...", or "How much..."
- Target related keywords
- Be answerable in 1-2 sentences
- Reference the tools or provide general guidance

Format as a JSON array like:
[
  { question: "...", answer: "..." },
  { question: "...", answer: "..." }
]

Answers should be natural and informative, 50-100 words each.
```

---

## Prompt 3: Generate Comparison Table Features

**Use this to:** Define what features should appear in the comparison table for a category.

```
I'm building a comparison table for a construction software category. The table will compare the top tools in this category side-by-side.

Category: {CATEGORY_NAME}
Description: {CATEGORY_DESCRIPTION}
Tools to Compare: {TOOL_NAMES}

Generate 5-6 key features/capabilities that contractors should compare when evaluating tools for this category. Each feature should:
- Be relevant to decision-making
- Be something contractors can clearly see/understand
- Be something you could verify by looking at each tool's website

Format as JSON:
[
  { key: "feature-slug", label: "Feature Display Name" },
  ...
]

Key format: use lowercase, hyphens for spaces
Label format: friendly, 2-3 words

Examples:
{ key: "real-time-updates", label: "Real-Time Updates" }
{ key: "mobile-app", label: "Mobile App" }
{ key: "offline-capability", label: "Offline Use" }
```

---

## Prompt 4: Generate SEO Metadata

**Use this to:** Create the title, meta description, and keywords for a category page.

```
I'm optimizing a category page for SEO. Help me create the title, meta description, and keywords.

Category: {CATEGORY_NAME}
Description: {CATEGORY_DESCRIPTION}
Primary Keyword: {PRIMARY_KEYWORD}
Related Keywords: {RELATED_KEYWORDS_LIST}

Generate SEO metadata:

1. Page Title (50-60 characters): Should include primary keyword and a benefit/year
   Example: "Best Construction Estimating Software for Accurate Bids"

2. Meta Description (150-160 characters): Compelling summary with primary keyword
   Example: "Compare top construction estimating software. Find tools for takeoffs, labor estimates..."

3. H1 (page heading): Similar to title but can be longer
   Example: "Best Construction Estimating Software for 2025"

4. Introduction paragraph (2-3 sentences): Hooks the reader, introduces the category value

Output as JSON:
{
  title: "...",
  metaDescription: "...",
  h1: "...",
  introduction: "..."
}
```

---

## Prompt 5: Generate Detailed Content Sections

**Use this to:** Create the main body content sections (beyond FAQ) for deep, SEO-optimized content.

```
I'm writing detailed content for a construction software category page. I need 2-3 comprehensive content sections.

Category: {CATEGORY_NAME}
Target Keywords: {PRIMARY_KEYWORD}, {RELATED_KEYWORDS}
Tools: {TOOL_NAMES}

Generate 2-3 major content sections for this category. Each section should:
- Have a clear heading that targets a keyword
- Be 2-3 paragraphs (200-300 words total per section)
- Provide educational value, not just sales pitch
- Reference practical contractor scenarios
- Position affiliate tools as solutions (without hard selling)

Suggested section themes:
1. "What is {Category}?" - Define the category and why it matters
2. "Key Features to Evaluate" - Educational guide to what matters
3. "How to Choose the Right Tool" - Framework for decision-making
4. "Implementation & ROI" - Business impact and benefits

Output as JSON array:
[
  { heading: "...", content: "<p>...</p><p>...</p>", type: "text" },
  ...
]

Use HTML paragraphs <p> but avoid complex formatting. Keep it simple and readable.
```

---

## Prompt 6: Generate Tool Recommendations

**Use this to:** Create the "primary CTA" text and secondary tool recommendations.

```
I'm writing recommendations for a software category page.

Category: {CATEGORY_NAME}
Top Rated Tool: {TOP_TOOL_NAME}
Alternative Tools: {TOOL_NAMES}

1. Generate a Primary CTA statement (short, action-oriented):
   Examples: "Get started with Procore", "Manage your pipeline", "Master your finances"
   Should be 3-4 words, action-oriented

2. Generate 2-3 sentences recommending the top tool for this specific category:
   - Why is it best for this category?
   - What specific problem does it solve?
   - Who should use it?

3. For 2-3 alternative tools, write brief positioning statements:
   "Tool Y is best for [specific contractor type/use case]"

Output as JSON:
{
  primaryCTA: "...",
  primaryToolRecommendation: "...",
  alternativeRecommendations: ["...", "..."]
}
```

---

## Prompt 7: Generate Internal Linking & Related Content

**Use this to:** Identify related categories for cross-linking and internal linking strategy.

```
I'm planning internal links for a software category page to improve navigation and SEO.

Category: {CATEGORY_NAME}
Category Description: {CATEGORY_DESCRIPTION}

Generate:

1. 2-3 related category IDs that contractors reading this page would also care about
   (Consider what software they'd use before/after or in conjunction with this)

2. For each related category, write 1 sentence explaining the connection
   Example: "Project scheduling works together with budget tracking to keep projects on time and within budget"

3. Generate 3-4 specific link anchor text suggestions for internal links
   Example: "Best project scheduling software", "Compare budget tracking tools"

Output as JSON:
{
  relatedCategories: ["category-slug-1", "category-slug-2"],
  relationships: ["explanation 1", "explanation 2"],
  linkAnchorSuggestions: ["anchor 1", "anchor 2"]
}

Make sure the related categories make logical sense and would drive traffic.
```

---

## Prompt 8: Generate Category Content Block (Complete)

**Use this to:** Generate a complete CategoryPage object ready to paste directly into TypeScript.

**WARNING: Use this only after completing individual prompts 1-7, and only for categories where you have the individual content pieces.**

```
Convert this category information into a complete TypeScript CategoryPage object.

Category Information:
- Slug: {CATEGORY_SLUG}
- Category ID: {CATEGORY_ID}
- Title: {TITLE}
- Meta Description: {META_DESCRIPTION}
- H1: {H1}
- Introduction: {INTRODUCTION}
- Top Tools: {TOOL_IDS} (comma-separated)
- Comparison Columns: {COMPARISON_FEATURES} (as JSON)
- Key Sections: {SECTIONS_JSON}
- FAQs: {FAQS_JSON}
- Primary CTA: {PRIMARY_CTA}
- Primary Tool ID: {PRIMARY_TOOL_ID}
- Keywords: {KEYWORDS_LIST}
- Related Categories: {RELATED_CATEGORY_IDS}

Generate a complete categoryPages object that matches this structure:

{
  slug: string
  categoryId: string
  title: string
  metaDescription: string
  h1: string
  introduction: string
  toolsToCompare: string[] (max 4)
  comparisonTableColumns: Array<{ key: string, label: string }>
  sections: Array<{ heading: string, content: string (HTML), type: "text" | "highlight" | "warning" }>
  primaryCTA: string
  primaryToolId: string
  secondaryToolIds?: string[]
  keywords: string[]
  faqs?: Array<{ question: string, answer: string }>
  relatedCategories?: string[]
  published: boolean
  featured: boolean
  lastUpdated: string (ISO format, use current date)
}

Output as valid TypeScript that can be pasted directly into categoryContent.ts.
Remember: content should be HTML formatted with <p>, <ul>, <li> tags. Tools should exist in toolDataset.ts.
```

---

## How to Use These Prompts

### For a Single Category:

1. Run Prompt 1 (Overview) → Copy output
2. Run Prompt 2 (FAQs) → Copy output
3. Run Prompt 3 (Comparison Features) → Copy output
4. Run Prompt 4 (SEO Metadata) → Copy output
5. Run Prompt 5 (Content Sections) → Copy output
6. Run Prompt 6 (Recommendations) → Copy output
7. Run Prompt 7 (Related Content) → Copy output
8. Use Prompt 8 to assemble everything into the final CategoryPage object

### For Batch Categories:

- Run Prompt 4 (SEO Metadata) for 5-10 categories at once
- Run Prompt 2 (FAQs) for 3-5 categories at once
- Then use Prompt 8 to assemble each complete object

---

## Tips for Best Results

**Provide specific tool names:** The more specific you are about tools, the better the content. Always include actual tool names from your toolDataset.ts.

**Clarify the contractor type:** Specify if content is for "general contractors", "residential remodelers", "HVAC contractors", etc. This helps Claude tailor the content.

**Keywords matter:** Provide the exact primary keyword and related keywords you want to target. Claude will naturally incorporate them.

**Review and edit:** Claude output is excellent but not perfect. Always review for:
- Accuracy (especially tool-specific claims)
- Consistency with your brand tone
- Relevance to contractors

**Iterate:** If a response isn't quite right, ask Claude to adjust specific parts (tone, length, focus) rather than regenerating everything.

---

## Example: Complete Workflow for "field-time-tracking"

```
Category: Field Time Tracking & Labor Tracking
Category ID: field-time-tracking
Slug: field-time-tracking
Description: Track worker hours, job time allocation, and labor costs in the field
Primary Keyword: construction time tracking software
Related Keywords: worker time clock app, labor cost tracking, job costing software, field time sheets
Top Tools: jobber, freshbooks, deputy

[Run Prompt 1 with above info]
→ Gets: Overview, key features, savings section

[Run Prompt 2 with above info]
→ Gets: 4-5 FAQs about time tracking

[Run Prompt 3 with above info]
→ Gets: 5-6 comparison features (e.g., mobile timekeeping, GPS tracking, real-time reporting)

[Run Prompt 4 with above info]
→ Gets: Title, meta description, H1, introduction

[Run Prompt 5 with above info]
→ Gets: 2-3 detailed content sections

[Run Prompt 6 with tools: jobber, freshbooks, deputy]
→ Gets: Primary CTA, recommendations

[Run Prompt 7 with above category info]
→ Gets: Related categories (payroll-management, field-crew-scheduling, project-budget-tracking)

[Copy all outputs and use Prompt 8]
→ Final: Complete CategoryPage object ready to paste into TypeScript
```

---

## Questions?

If Claude can't generate exactly what you need:
- Break it into smaller pieces
- Provide more specific examples
- Ask Claude to adjust tone/style
- Reference the seed content in categoryContent.ts for formatting examples
