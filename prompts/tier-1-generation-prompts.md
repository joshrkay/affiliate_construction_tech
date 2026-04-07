# Tier 1 Content Generation Prompts

## Overview

These prompts generate high-quality category content for construction contractors. They explicitly avoid AI slop and prioritize practical, honest writing that sounds like it came from someone who understands construction.

**Important**: Read `TIER_1_CONTENT_GUIDE.md` first. These prompts assume you understand the voice/tone standards.

---

## Prompt 1: Writing Standards Check (Do This First)

Use this to validate that AI-generated content meets quality standards.

```
I need you to review this contractor-focused category page content for "AI slop" and make it sound more honest and practical.

Writing standards for construction contractors:
- No buzzwords ("streamline," "optimize," "innovative," "leverage")
- Specific numbers only (time saved, money, margins) - no "significant" or "substantial"
- Lead with outcomes, not features
- Use their language, not marketing language
- Address real concerns: cost, implementation time, learning curve, switching cost
- Be honest about limitations
- No exclamation points
- No generic openings like "In today's construction industry..."

Content to review:
[PASTE GENERATED CONTENT HERE]

Please:
1. Flag any buzzwords or generic marketing language
2. Rewrite vague statements to be specific
3. Add numbers where missing
4. Simplify complex sentences
5. Remove anything that sounds salesy
6. Keep the overall structure and key points

Show the improved version and explain changes you made.
```

---

## Prompt 2: Generate High-Quality Introduction

Use this to create the opening paragraph that hooks contractors.

```
I'm building category pages for construction software. I need a 150-200 word introduction that proves I understand contractors' pain points.

Category: {CATEGORY_NAME}
Category Description: {CATEGORY_DESCRIPTION}
Target Audience: Construction contractors (field-focused, ROI-focused, practical)

Requirements:
- Open with the real problem contractors face (in their words, not marketing language)
- Explain the business impact (time/money/stress)
- Preview what the page covers
- NO buzzwords, NO generic openings, NO exclamation points
- Should sound like it was written by someone who runs jobs, not a marketer

Example good opening (for project estimating):
"Accurate estimates make or break construction jobs. Miss a cost, and your margin disappears. Yet contractors still spend hours manually counting items from blueprints, updating spreadsheets, and cross-checking numbers."

Write the introduction paragraph. Start with the pain point.
```

---

## Prompt 3: Generate "Why It Matters" Section

Use this to explain business impact in concrete terms.

```
I need a 100-150 word explanation of why {CATEGORY_NAME} matters to contractors, with specific impact numbers.

Category: {CATEGORY_NAME}
Example: For "Project Estimating" - the impact is accuracy + speed = margin improvement + more jobs won

Your task:
1. Lead with ONE specific, measurable impact (e.g., "saves 6 hours per week" or "improves margins by 12%")
2. Explain the downstream effects (more profit, faster quoting, less stress)
3. Make it relatable to their business
4. NO marketing language, NO buzzwords

Format:
- 1-2 sentences on the main impact
- 2-3 sentences on why it matters to their bottom line
- 1 sentence wrapping up

Use specific numbers where possible. If unsure about exact numbers, use ranges or say "typically."
```

---

## Prompt 4: Generate Feature Comparison Section

Use this to explain what actually matters when choosing a tool.

```
I'm writing a "Key Features to Compare" section for {CATEGORY_NAME} software.

Category: {CATEGORY_NAME}
Top Tools in this category: {TOOL_NAMES}

Your task:
1. Identify 4-5 features that ACTUALLY MATTER for this category
2. Explain why each matters (not just list the feature)
3. Give contractor-relevant examples
4. Be specific about tradeoffs

Format per feature:
**Feature Name** (bold)
- What it is (1 sentence)
- Why it matters for contractors (1-2 sentences)
- Contractor example (1 sentence showing how they'd use it)

Example (Digital Takeoff for estimating):
**Digital Takeoff**: Instead of manually counting items from a PDF, the software extracts quantities automatically.

Why it matters: This cuts estimate creation time in half and eliminates counting errors.

Contractor example: You upload a blueprint, click the rooms you want to estimate, and the software extracts paint quantities automatically. Change a room size, and costs recalculate instantly.

Generate 4-5 features like this. Be specific. Avoid generic software features.
```

---

## Prompt 5: Generate Tool Recommendation

Use this for each of the 3-4 featured tools.

```
I need a recommendation section for {TOOL_NAME} as part of a {CATEGORY_NAME} category page.

Tool: {TOOL_NAME}
Who it's best for: {TARGET_CONTRACTOR_TYPE}
Pricing: {PRICING}
Key strength: {MAIN_DIFFERENTIATOR}
Main limitation: {HONEST_LIMITATION}

Write 150-200 words following this structure:

**{TOOL_NAME} for {Contractor Type}**

Best for: {One sentence describing who should use this}

Why: {2-3 sentences explaining specific reasons, not marketing. What does this tool do that matters?}

Pricing: {State it plainly}

Limitation: {Honest limitation. Who should avoid this? Why might it not work?}

Tone requirements:
- Be specific about capabilities (not "robust" or "powerful")
- Explain trade-offs honestly
- Address real contractor concerns (learning curve, setup time, support)
- Sound like a trusted peer, not a salesman

Example:
**Procore for Large Commercial Projects**
Best for: General contractors managing $10M+ in annual projects
Why: Procore's digital takeoff is strongest in the industry...
```

---

## Prompt 6: Generate FAQ (High-Intent Keywords)

Use this to answer contractor concerns and capture search keywords.

```
I need 5-6 FAQ items for {CATEGORY_NAME} software pages.

Category: {CATEGORY_NAME}
Typical contractor concerns: {LIST CONCERNS}

Your task:
Generate Q&A that addresses:
1. "Do I really need this software?" (value argument)
2. "How much does it cost?" (pricing reality)
3. "How long to implement?" (time/disruption)
4. "Do my crew need training?" (adoption friction)
5. "Can I export my data?" (lock-in concern)
6. Plus 1 category-specific question

Format: {Q}: [question]
{A}: [50-100 word answer]

Requirements:
- Questions should be real contractor concerns, not "what is X"
- Answers should be honest (if implementation is hard, say so)
- No buzzwords
- Be direct and practical

Example:
Q: How long does it take to get running?
A: Most contractors are productive within 2 weeks. Setup takes 2-3 days if you're importing historical data. If you're starting fresh, maybe 5-7 days. Expect your team to need 1-2 weeks before they're comfortable. The vendor usually provides onboarding support.
```

---

## Prompt 7: Generate Spanish Version (From English)

Use this AFTER the English version is approved.

```
I need a Spanish translation of this contractor software category page. Important: NOT auto-translation. Localize for Spanish construction terminology.

Language: Spanish (Spain/Latin America neutral)
Audience: Spanish-speaking construction contractors
Original (English) content:
[PASTE ENGLISH VERSION HERE]

Your task:
1. Translate the content to natural, practical Spanish
2. Use construction-specific terminology (not Google Translate):
   - Presupuestos (estimates), not estimación
   - Cuadrilla (field crew), not grupo
   - Factura (invoice), not invoicio
   - Obra (job site/project), not proyecto
3. Maintain the same tone (direct, practical, no buzzwords)
4. Adapt numbers/examples if needed for Spanish-speaking markets
5. Keep SEO structure (titles, headings match English version)

Deliverable: Full Spanish version with:
- title
- metaDescription (Spanish SEO)
- h1
- introduction
- sections
- faqs
- CTAs

Check my terminology guide in TIER_1_CONTENT_GUIDE.md for construction Spanish terms.
```

---

## Prompt 8: Complete CategoryPage Object Generator

Use this AFTER you have all sections written and reviewed.

```
I need to convert contractor-friendly category content into a TypeScript CategoryPage object.

Provide this information:
- Category Slug: {SLUG}
- Category ID: {ID}
- Language: {en or es}
- Title (SEO): {TITLE}
- Meta Description: {META_DESCRIPTION}
- H1: {H1}
- Introduction: {INTRODUCTION_PARAGRAPH}
- Why It Matters: {WHY_IT_MATTERS_PARAGRAPH}
- Key Features Section: {FEATURES_WITH_EXPLANATIONS}
- Recommended Tools (3-4): {TOOL_ID1}, {TOOL_ID2}, {TOOL_ID3}
- Tool Details for Each: {RECOMMENDATION_PARAGRAPHS}
- FAQs (5-6): {QUESTION}, {ANSWER}
- Primary CTA: {CTA_TEXT}
- Primary Tool ID: {TOOL_ID}
- Keywords: {PRIMARY_KEYWORD, RELATED_KEYWORDS}
- Related Categories: {CATEGORY_IDS}

Generate a complete CategoryPage TypeScript object that can be pasted directly into categoryContent.ts.

Format:
{
  slug: string
  categoryId: string
  language: 'en' | 'es'
  title: string
  metaDescription: string
  h1: string
  introduction: string
  whyItMatters: string
  toolsToCompare: string[]
  comparisonTableColumns: Array<{ key: string, label: string }>
  sections: Array<{ heading: string, content: string, type?: string }>
  primaryCTA: string
  primaryToolId: string
  keywords: string[]
  faqs?: Array<{ question: string, answer: string }>
  relatedCategories?: string[]
  published: boolean
  featured: boolean
  lastUpdated: string
}

Make sure:
- All content is HTML-formatted with <p>, <ul>, <li>, <strong> tags
- No placeholder brackets [{...}] remain
- Featured: true for high-priority categories, false for others
- lastUpdated: Use current date in ISO format
```

---

## Workflow for Generating Tier 1 (35 Categories)

### Phase 1: First 5 Categories (Test Quality)

1. **For each category:**
   - Run Prompt 2 (Introduction)
   - Run Prompt 3 (Why It Matters)
   - Run Prompt 4 (Features)
   - Run Prompt 5 (Tools x3)
   - Run Prompt 6 (FAQ)

2. **Run Prompt 1 (Quality Check)**
   - Review all sections for AI slop
   - Rewrite any buzzwords or vague language
   - Validate contractor language

3. **Run Prompt 8 (Object Generation)**
   - Convert to CategoryPage TypeScript object
   - Add to categoryContent.ts

4. **Test Deploy**
   - `npm run build`
   - Verify pages render at `/categories/[slug]`

5. **Review & Approve**
   - Check pages in browser
   - Validate CTAs and affiliate links
   - Confirm no buzzwords made it through

### Phase 2: Batch Generate Remaining 30 (English)

- Once first 5 pass quality check, repeat workflow for:
  - Categories 6-15 (batch 1)
  - Categories 16-25 (batch 2)
  - Categories 26-35 (batch 3)

### Phase 3: Generate Spanish Versions (35 Categories)

- Run Prompt 7 for each English category
- Run Prompt 1 quality check on Spanish
- Generate Spanish CategoryPage objects
- Add to categoryContent.ts with `language: 'es'`

### Phase 4: Deploy All at Once

```bash
npm run build
# Verifies all 70 pages (35 EN + 35 ES) prerender
# Updates sitemap.xml with all category routes
```

---

## Quality Gates

**Before publishing, EVERY page must pass:**

1. ✅ No buzzwords (streamline, optimize, innovative, etc.)
2. ✅ Specific numbers (6 hours saved, not "significant time")
3. ✅ Real contractor language (cuadrilla, not "team," for Spanish)
4. ✅ Honest limitations (not just benefits)
5. ✅ Clear CTAs (benefit-focused, not generic)
6. ✅ No exclamation points
7. ✅ Reads naturally (would a contractor think "yep, that's right"?)

---

## Tips for Better Results

**1. Provide Contractor Context**
- "These are for HVAC contractors, 2-50 employees"
- "Most are switching from spreadsheets"
- "They care about ROI and implementation time"

**2. Use Examples from the Seed Pages**
- Review the 15 seed pages in categoryContent.ts
- Use similar structure and tone for new categories

**3. Validate Tool Information**
- Before recommending, check:
  - Actual pricing (not estimates)
  - Real affiliate program (confirm in toolDataset.ts)
  - Honest limitations (not just pros)

**4. Iterate, Don't Generate Once**
- First draft rarely perfect
- Run quality check, rewrite, then finalize
- Bilingual content needs language review

**5. Test in Browser**
- After generating objects, rebuild and test locally
- Verify links work, CTAs appear, formatting correct

---

## Common Mistakes to Avoid

- ❌ Using auto-translation (Google Translate) for Spanish
- ❌ Generic features instead of contractor-relevant ones
- ❌ Marketing speak ("leverage," "streamline," "innovative")
- ❌ No numbers or specificity
- ❌ Not addressing real contractor concerns
- ❌ Copying/pasting between categories (each should be unique)
- ❌ Exclamation points and hype language
- ❌ Not testing bilingual pages in browser

---

## Next Steps

1. ✅ Read TIER_1_CONTENT_GUIDE.md
2. ✅ Read this prompt file
3. ⬜ Use Prompt 2-8 to generate first category (project-estimating)
4. ⬜ Run Prompt 1 (quality check)
5. ⬜ Fix any issues
6. ⬜ Batch remaining 34 categories
7. ⬜ Generate Spanish versions
8. ⬜ Deploy
