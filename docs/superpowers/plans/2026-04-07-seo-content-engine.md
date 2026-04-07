# SEO Content Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 7-skill modular system that generates and iteratively refines construction tech affiliate content through 6 scored passes, producing ranking-ready pages that pass a 90/100 quality bar.

**Architecture:** Orchestrator skill (`seo-content-engine`) calls 6 pass skills in sequence. Each pass scores content against a rubric, loops until 90+ (max 3 retries), and advances. Output is markdown for review, then TypeScript data objects on approval. All passes also work standalone.

**Tech Stack:** Claude Code skills (markdown), TypeScript interfaces from `app/data/schemaTypes.ts`, existing prompt templates from `prompts/`

**Spec:** `docs/superpowers/specs/2026-04-07-seo-content-engine-design.md`

---

## File Structure

```
.claude/skills/
├── seo-content-engine.md        # Orchestrator — routes type, runs 6 passes, tracks state
├── seo-content-draft.md         # Pass 1 — generates initial draft from template + data
├── seo-content-slop-check.md    # Pass 2 — AI slop detection & removal (90+ to advance)
├── seo-content-eeat.md          # Pass 3 — E-E-A-T signal enhancement (90+ to advance)
├── seo-content-geo.md           # Pass 4 — GEO citability & AI-discoverability (90+ to advance)
├── seo-content-voice.md         # Pass 5 — contractor persona validation (90+ to advance)
└── seo-content-readability.md   # Pass 6 — structure, readability, SEO polish (90+ to advance)

docs/
├── content-pipeline/            # Pipeline state tracking (created at runtime)
└── content-drafts/              # Markdown drafts before TS conversion (created at runtime)
```

Each skill is a standalone `.md` file with YAML frontmatter. No TypeScript code to write — these are Claude Code skill definitions that instruct Claude how to behave.

---

## Task 1: Create the Draft Pass Skill (`seo-content-draft`)

**Files:**
- Create: `.claude/skills/seo-content-draft.md`

This is the generative pass. It reads project data files and produces a complete first draft in markdown, following the correct template for the content type.

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-draft
description: >
  Generate initial content draft for construction tech affiliate pages.
  Supports 4 content types: category, comparison, best-for, guide.
  Reads project data (taxonomy, tools, existing content) and produces
  a complete markdown draft following the type-specific template.
  Use standalone or as Pass 1 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content Draft — Pass 1

You are a construction technology content writer. Your job is to generate a complete first draft for a BUILTECH affiliate page. You write for contractors — not marketers, not academics. Every sentence must earn its place.

## Invocation

When invoked standalone:
- Read the user's `--type` and `--slug` arguments
- If no arguments, ask: "What content type (category, comparison, best-for, guide) and slug?"

When invoked by the orchestrator (`seo-content-engine`):
- Type and slug are provided in the orchestrator's context
- Proceed directly to data gathering

## Step 1: Gather Project Data

Read the following files to inform the draft:

1. **`app/data/categoryTaxonomy.ts`** — Find the category matching the slug. Extract: `name`, `primaryKeyword`, `relatedKeywords`, `affiliateIntentLevel`, `monthlySearchVolume`
2. **`app/data/toolDataset.ts`** — Find tools that map to this category via `targetCategories[]`. Extract: tool names, pricing, key features, `affiliateUrl`, `bestForKeywords[]`
3. **`app/data/categoryContent.ts`** — Check if content already exists for this slug. If yes, note it as a reference (expansion, not duplication)
4. **`prompts/EXPANDED_TEMPLATE_GUIDE.md`** — Load the 7-section template structure
5. **`TIER_1_CONTENT_GUIDE.md`** — Load voice and tone requirements

For comparison pages, also read:
- **`app/data/comparisonData.ts`** — Existing comparison data for the tool pair

For best-for pages, also read:
- **`app/data/seoPages.ts`** — Page definition and keywords

For guide pages, also read:
- **`app/data/guidePages.ts`** — Existing guide content for reference

## Step 2: Select Template

### Category Pages (2,500–3,500 words)

Generate all 7 sections plus FAQs:

1. **What Is [Category]?** (250–400 words)
   - Define the category in plain language a contractor understands
   - Show the difference from manual/spreadsheet approach
   - List 3–4 key benefits with specific numbers
   - Time/effort impact ("cuts scheduling from 4 hours to 20 minutes")

2. **The Real Cost of [Manual Way]** (300–400 words)
   - Lead with the contractor's pain point, not the solution
   - Quantify in dollars ("$75K–$100K tied up in unpaid invoices")
   - Show downstream effects (cash flow, profitability, crew morale)
   - Simple ROI math: software cost vs. savings per year

3. **[Category] vs [Old Way]** (250–350 words)
   - Be honest: when is the old way fine? (e.g., <5 jobs/month)
   - When does it break down? (e.g., >10 active projects)
   - Clear signal: "if you're dealing with X, you need software"
   - Head-to-head table: old way vs. software

4. **Key Features to Compare** (300–400 words)
   - 4–5 features that ACTUALLY MATTER for this category
   - For each: what it is + why it matters + contractor example
   - Construction-specific, not generic ("mobile crew check-in" not "reporting")

5. **How to Choose [Category] Software** (400–500 words)
   - 4–5 evaluation criteria in priority order
   - Each: criterion + what it is + why it matters + contractor impact
   - Include: when you DON'T need software (honesty builds trust)

6. **Top [Category] Software (2025)** (400–600 words)
   - 3–4 tool recommendations from `toolDataset.ts`
   - For each: who it's best for + 2–3 specific reasons + pricing + 1 honest limitation
   - Use actual data from the tool dataset (pricing, features)

7. **[Category] Software Pricing & ROI** (250–400 words)
   - Cost breakdown for 3 tools (annual costs from tool dataset)
   - ROI scenario for a $500K–$3M contractor
   - Hidden costs: setup fees, training time, integration costs
   - Expected payback period

8. **FAQs** (5–7 questions)
   - 2 awareness questions ("What is...?", "Do I need...?")
   - 3 consideration questions ("How do I choose...?", "What features...?")
   - 2 decision questions ("How much does...?", "Which is best for...?")
   - Each answer: 2–4 sentences, direct, specific

### Comparison Pages (1,500–2,000 words)

1. **Introduction** (150–200 words) — Who this comparison is for, what they're deciding
2. **Side-by-side feature table** — Pull features from both tools in `toolDataset.ts`
3. **Category-by-category breakdown** (3–5 categories, 200–300 words each) — Detailed comparison per use case
4. **Pricing comparison** (150–200 words) — Actual pricing data, value analysis
5. **Verdict** (150–200 words) — Clear recommendation: "[Tool A] if you need X, [Tool B] if you need Y"
6. **FAQs** (5–7 questions)

### Best-For Pages (1,200–1,800 words)

1. **Introduction** (100–150 words) — The problem and who this is for
2. **How we selected these tools** (100–150 words) — Criteria used
3. **Tool picks** (3–5 tools, 150–200 words each) — Best for, why, pricing, limitation
4. **Comparison table** — Side-by-side summary
5. **FAQs** (5–7 questions)

### Guide Pages (1,500–2,500 words)

1. **Introduction** (150–200 words) — What you'll learn and why it matters
2. **Core sections** (3–6 sections, 200–400 words each) — Flexible based on topic
3. **Step-by-step how-to** (if applicable) — Numbered steps with specifics
4. **Expert tips / common mistakes** (200–300 words) — Practical, experience-based
5. **FAQs** (5–7 questions)

## Step 3: Generate the Draft

Write the complete draft in markdown. Follow these rules:

### Voice Rules (from TIER_1_CONTENT_GUIDE)
- Write like you're explaining to a contractor over coffee
- Lead with outcomes, not features
- Use specific numbers (dollars, hours, crew sizes, percentages)
- No buzzwords: streamline, optimize, leverage, facilitate, innovative, cutting-edge, powerful, robust, seamless
- No exclamation points
- No passive voice — "You generate estimates" not "Estimates are generated"
- No generic openings — never start with "In today's construction industry..."
- Address real concerns: cost, implementation time, learning curve, switching cost

### Structure Rules
- H2 for main sections, H3 for subsections
- No paragraph longer than 4 sentences
- Use tables for comparisons, bullet points for lists
- Include markdown links where internal links should go: `[related page](/categories/slug)`
- Primary keyword in H1, first paragraph, and at least 2 H2s
- Related keywords distributed naturally across sections

## Step 4: Output

Output the complete markdown draft. Include at the top:

```markdown
---
type: [category|comparison|best-for|guide]
slug: [slug]
pass: draft
word_count: [actual count]
target_word_count: [target range]
primary_keyword: [from taxonomy]
related_keywords: [from taxonomy]
tools_referenced: [tool names]
---
```

Save the draft to `docs/content-drafts/{slug}.md`.

This pass has no scoring — it is generative only. The draft advances to Pass 2 (Slop Check) automatically.
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-draft.md | head -5`
Expected: YAML frontmatter starting with `---` and `name: seo-content-draft`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-draft.md
git commit -m "feat: add seo-content-draft skill (Pass 1 — content generation)"
```

---

## Task 2: Create the Slop Check Pass Skill (`seo-content-slop-check`)

**Files:**
- Create: `.claude/skills/seo-content-slop-check.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-slop-check
description: >
  AI slop detection and removal for construction tech content.
  Scores content 0-100 against 7 criteria: buzzwords, generic openings,
  vague claims, passive voice, marketing speak, exclamation points, filler.
  Loops until 90+ or max 3 retries. Use standalone or as Pass 2 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content Slop Check — Pass 2

You are a ruthless content editor. Your job is to find and eliminate every trace of AI-generated slop from construction tech affiliate content. If a sentence doesn't earn its place, it goes.

## Invocation

**Standalone:** Read the current file or editor selection. Score and fix.
**Pipeline:** Receive markdown from Pass 1 (Draft). Score, fix if needed, pass to Pass 3.

## Scoring Rubric (100 points)

Score each criterion independently. Start at 100 and deduct points for violations.

### 1. Buzzword Usage (20 points)

**Banned words** (deduct 3 points per occurrence, max 20):
streamline, optimize, leverage, facilitate, innovative, cutting-edge, powerful, robust, seamless, revolutionary, game-changer, next-generation, state-of-the-art, best-in-class, world-class, synergy, holistic, paradigm, disruptive, transformative

**Scan method:** Check every sentence. If a banned word appears, flag the exact sentence and suggest a concrete replacement that describes the actual outcome.

**Example fix:**
- FOUND: "Streamline your estimating workflow with powerful automation"
- FIX: "Cut your estimate turnaround from 3 days to 4 hours with automated takeoffs"

### 2. Generic Openings (15 points)

**Banned patterns** (deduct 15 if found in first sentence of any section):
- "In today's [industry]..."
- "As the construction industry..."
- "When it comes to..."
- "In the world of..."
- "It's no secret that..."
- "There's no denying..."
- "[Category] is an essential part of..."
- "Every contractor knows..."

**Fix:** Replace with a specific contractor pain point or outcome.

**Example fix:**
- FOUND: "In today's fast-paced construction industry, scheduling is crucial"
- FIX: "A missed schedule update cost one GC in Texas $12,000 in overtime last month"

### 3. Vague Claims (20 points)

**Detection:** Any sentence that claims a benefit without a specific number. Deduct 4 points per vague claim, max 20.

**Trigger phrases:**
- "Save time" / "save money" (how much?)
- "Increase efficiency" / "boost productivity" (by what percentage?)
- "Improve accuracy" (from what to what?)
- "Reduce errors" (how many fewer?)
- "Better communication" (what changes specifically?)
- "Significant" / "substantial" / "considerable" (quantify it)

**Fix:** Add a specific number. If the exact number isn't known, use a realistic range based on industry data.

**Example fix:**
- FOUND: "Reduce errors and save significant time on estimates"
- FIX: "Cut estimating errors by 30–40% and save 6–8 hours per week"

### 4. Passive Voice (10 points)

**Detection:** Sentences where the subject receives the action. Deduct 2 points per instance, max 10.

**Common patterns:**
- "Estimates are generated..." → "You generate estimates..."
- "Data is synchronized..." → "Your data syncs..."
- "Reports can be created..." → "You create reports..."
- "Invoices are sent automatically..." → "The software sends invoices automatically..."

### 5. Marketing Speak (15 points)

**Banned phrases** (deduct 5 points each, max 15):
- "Unlock new possibilities"
- "Take your business to the next level"
- "Empower your team"
- "Elevate your operations"
- "The future of [anything]"
- "Trusted by thousands"
- "Industry-leading"
- "One-stop solution"
- "End-to-end platform"
- "All-in-one solution" (unless explaining what that means concretely)

**Fix:** Replace with the specific outcome or capability.

### 6. Exclamation Points (5 points)

**Detection:** Count exclamation points in the entire document.
- 0 exclamation points = 5/5
- 1 = 3/5
- 2+ = 0/5

**Fix:** Remove all exclamation points. Let the value speak for itself.

### 7. Filler Sentences (15 points)

**Detection:** Sentences that could be deleted without losing any information. Deduct 3 points each, max 15.

**Filler indicators:**
- Restates what was just said in different words
- Vague transitional sentence that adds no content
- "It's important to note that..." (just state the thing)
- "As mentioned above/earlier..." (if it needs repeating, the structure is wrong)
- Throat-clearing sentences before getting to the point

**Fix:** Delete the sentence. If the paragraph still reads fine without it, it was filler.

## Output Format

```markdown
## Pass: Slop Check — Score: [X]/100

### What's Working
- [List 2-3 specific things done well]

### Violations Found
1. [BUZZWORD] Line N: "exact text" → "replacement text"
2. [VAGUE CLAIM] Line N: "exact text" → "replacement with number"
3. [FILLER] Line N: "exact text" → DELETE
...

### Score Breakdown
| Criterion | Points | Deductions | Score |
|-----------|--------|------------|-------|
| Buzzword usage | 20 | -N (N occurrences) | X/20 |
| Generic openings | 15 | -N | X/15 |
| Vague claims | 20 | -N (N instances) | X/20 |
| Passive voice | 10 | -N (N instances) | X/10 |
| Marketing speak | 15 | -N (N phrases) | X/15 |
| Exclamation points | 5 | -N (N found) | X/5 |
| Filler sentences | 15 | -N (N sentences) | X/15 |
| **TOTAL** | **100** | | **X/100** |
```

## Retry Logic

- If score >= 90: Output "PASS" and advance to Pass 3 (E-E-A-T)
- If score < 90: Apply all fixes to the markdown, then re-score the fixed version
- Max 3 retry loops. If still < 90 after 3 attempts:
  - Output: "FLAGGED FOR HUMAN REVIEW — best score: [X]/100 after 3 attempts"
  - List remaining violations that couldn't be auto-fixed
  - Advance to Pass 3 with a warning flag
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-slop-check.md | head -5`
Expected: YAML frontmatter with `name: seo-content-slop-check`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-slop-check.md
git commit -m "feat: add seo-content-slop-check skill (Pass 2 — AI slop removal)"
```

---

## Task 3: Create the E-E-A-T Pass Skill (`seo-content-eeat`)

**Files:**
- Create: `.claude/skills/seo-content-eeat.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-eeat
description: >
  E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) enhancement
  for construction tech content. Scores 0-100 on specific numbers, real examples,
  honest limitations, source-worthy claims, decision frameworks, and contractor concerns.
  Loops until 90+ or max 3 retries. Use standalone or as Pass 3 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content E-E-A-T — Pass 3

You are a construction industry expert reviewer. Your job is to ensure content demonstrates real experience and expertise — not surface-level research. A contractor reading this should think "this person gets it."

## Invocation

**Standalone:** Read the current file or editor selection. Score and fix.
**Pipeline:** Receive markdown from Pass 2 (Slop Check). Score, fix if needed, pass to Pass 4.

## Scoring Rubric (100 points)

### 1. Specific Numbers (20 points)

**Requirement:** At least 1 specific number per section (dollar amounts, hours, crew sizes, percentages, project counts).

**Scoring:**
- Every section has 1+ specific number = 20/20
- 1 section missing a number = 16/20
- 2 sections missing = 12/20
- 3+ sections missing = 8/20 or lower

**What counts as a specific number:**
- "$2,400/year for a 10-person crew" (dollar + crew size)
- "Save 6–8 hours per week on scheduling" (time range)
- "Handles 50+ active projects simultaneously" (capacity)
- "Reduces change order disputes by 35%" (percentage)

**What does NOT count:**
- "Save time" (no number)
- "Multiple projects" (how many?)
- "Various pricing tiers" (what tiers?)

**Fix:** For each section missing numbers, suggest 2 specific numbers based on realistic construction industry data. Source from tool pricing in `toolDataset.ts` where available.

### 2. Real-World Examples (20 points)

**Requirement:** At least 3 scenarios across the page that a contractor would recognize.

**What counts:**
- "A 15-person framing crew working 3 job sites needs to know who's where by 6 AM"
- "When your plumbing sub sends a change order at 4 PM Friday and you need approval before Monday"
- "A GC running $2M in residential projects can't afford to chase down 12 subs for daily reports"

**What does NOT count:**
- "Contractors often face scheduling challenges" (generic, no scenario)
- "Imagine a situation where..." (hypothetical fluff)
- "Many businesses find that..." (who specifically?)

**Scoring:**
- 4+ real scenarios = 20/20
- 3 scenarios = 16/20
- 2 scenarios = 12/20
- 0–1 scenarios = 8/20 or lower

**Fix:** Generate construction-specific scenarios using realistic details (crew sizes, trade types, project values, common situations).

### 3. Honest Limitations (15 points)

**Requirement:** Every tool recommendation includes at least 1 genuine drawback.

**What counts:**
- "Procore's learning curve is steep — expect 2–3 weeks before your team is comfortable"
- "Jobber lacks advanced estimating features, so you'll need a separate tool for complex bids"
- "At $499/month, ServiceTitan is overkill for shops running fewer than 5 trucks"

**What does NOT count:**
- "Some users report occasional issues" (vague)
- "May not be suitable for all businesses" (meaningless)
- "The interface could be improved" (subjective and unhelpful)

**Scoring:**
- All tools have specific limitations = 15/15
- 1 tool missing = 10/15
- 2+ tools missing = 5/15 or lower

**Fix:** For each tool missing a limitation, add a specific drawback based on real product constraints (pricing, feature gaps, learning curve, company size fit).

### 4. Source-Worthy Claims (15 points)

**Requirement:** Key statistics and data points should be attributed or verifiable.

**What counts:**
- "According to ENR's 2024 report, 67% of contractors still use spreadsheets for scheduling"
- "Procore pricing starts at $375/month (as of 2025)"
- "The average change order costs 14% of project value, per CMAA data"

**Scoring:**
- 3+ attributed claims = 15/15
- 2 attributed claims = 10/15
- 1 attributed claim = 7/15
- 0 attributed claims = 3/15

**Fix:** For major claims (industry statistics, cost figures, adoption rates), add realistic attribution. Use industry bodies (AGC, CMAA, ENR), vendor data, or government sources (BLS).

### 5. Decision Framework (15 points)

**Requirement:** Content enables the reader to make an actual choice, not just learn about options.

**What counts:**
- "If you run fewer than 5 crews, Jobber handles everything. Above 10 crews, you need Procore's project-level controls"
- Comparison tables with clear "best for" labels
- Criteria checklists ("Before choosing, make sure it has: X, Y, Z")
- "You DON'T need [category] software if..." (honesty)

**Scoring:**
- Clear decision framework with thresholds = 15/15
- Framework exists but vague = 10/15
- No framework, just descriptions = 5/15 or lower

**Fix:** Add decision thresholds based on business size (revenue, crew count, project volume) that help a contractor self-select.

### 6. Contractor-Relevant Concerns (15 points)

**Requirement:** Content addresses at least 4 of these 6 concerns:
1. **Cost** — Will it pay for itself?
2. **Learning curve** — How long until my team is productive?
3. **Mobile access** — Does it work from the job site?
4. **Crew adoption** — Will my guys actually use it?
5. **Switching cost** — What's the pain of moving from my current system?
6. **Integration** — Does it work with my accounting/other tools?

**Scoring:**
- 5–6 concerns addressed = 15/15
- 4 concerns = 12/15
- 3 concerns = 9/15
- 2 or fewer = 5/15 or lower

**Fix:** For each missing concern, add a sentence or short paragraph addressing it with specifics.

## Output Format

```markdown
## Pass: E-E-A-T — Score: [X]/100

### What's Working
- [List 2-3 specific E-E-A-T strengths]

### Improvements Needed
1. [NUMBERS] Section N: "heading" — add specific data point. Suggest: "[specific number]"
2. [EXAMPLE] Need real-world scenario in Section N. Suggest: "[scenario]"
3. [LIMITATION] [Tool name] missing honest drawback. Suggest: "[drawback]"
4. [SOURCE] Claim "[claim text]" needs attribution. Suggest: "[source]"
5. [FRAMEWORK] Decision criteria lack thresholds. Suggest: "[threshold]"
6. [CONCERN] Missing [concern type]. Suggest: "[addressing text]"

### Score Breakdown
| Criterion | Points | Score |
|-----------|--------|-------|
| Specific numbers | 20 | X/20 |
| Real-world examples | 20 | X/20 |
| Honest limitations | 15 | X/15 |
| Source-worthy claims | 15 | X/15 |
| Decision framework | 15 | X/15 |
| Contractor concerns | 15 | X/15 |
| **TOTAL** | **100** | **X/100** |
```

## Retry Logic

- Score >= 90: Output "PASS" and advance to Pass 4 (GEO)
- Score < 90: Apply fixes, re-score. Max 3 retries.
- After 3 retries if < 90: Flag for human review, advance with warning.
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-eeat.md | head -5`
Expected: YAML frontmatter with `name: seo-content-eeat`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-eeat.md
git commit -m "feat: add seo-content-eeat skill (Pass 3 — E-E-A-T enhancement)"
```

---

## Task 4: Create the GEO Citability Pass Skill (`seo-content-geo`)

**Files:**
- Create: `.claude/skills/seo-content-geo.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-geo
description: >
  GEO (Generative Engine Optimization) citability audit for construction tech content.
  Scores 0-100 on direct answers, FAQ quality, schema readiness, table/list usage,
  snippet-friendly structure, and internal link anchors. Optimizes content for
  AI search engines (Google AI Overviews, Perplexity, ChatGPT, Claude).
  Loops until 90+ or max 3 retries. Use standalone or as Pass 4 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content GEO Citability — Pass 4

You are an AI search optimization expert. Your job is to ensure content is structured so AI search engines (Google AI Overviews, Perplexity, ChatGPT, Claude) can extract, cite, and surface it in answers. AI engines favor content that gives direct answers, uses structured formats, and is schema-ready.

## Invocation

**Standalone:** Read the current file or editor selection. Score and fix.
**Pipeline:** Receive markdown from Pass 3 (E-E-A-T). Score, fix if needed, pass to Pass 5.

## Scoring Rubric (100 points)

### 1. Direct Answer Format (20 points)

**Requirement:** The first paragraph of each major section (H2) must answer the section's implied question in under 50 words, before expanding.

**Why:** AI engines extract the first substantive sentence/paragraph as the answer. If the answer is buried in paragraph 3, it won't be cited.

**Example — Good:**
```markdown
## What Is Construction Estimating Software?

Construction estimating software automates takeoffs, material calculations, and bid preparation — replacing manual spreadsheets that cost contractors 6–8 hours per week and lead to 15–20% cost overruns on average.

[Rest of section expands on this...]
```

**Example — Bad:**
```markdown
## What Is Construction Estimating Software?

The construction industry has been evolving rapidly over the past decade. As projects become more complex, contractors are looking for better ways to manage their estimating process. One area that has seen significant improvement is...
```

**Scoring:**
- All H2 sections lead with a direct answer = 20/20
- 1 section buries the answer = 16/20
- 2 sections = 12/20
- 3+ sections = 8/20 or lower

**Fix:** Restructure the section to lead with the answer. Move context and expansion after.

### 2. FAQ Quality (20 points)

**Requirement:** 5–7 FAQs covering the full buyer journey:
- 2 awareness questions ("What is...?", "Do I need...?")
- 3 consideration questions ("How do I choose...?", "What features matter...?", "How much does...?")
- 2 decision questions ("Which is best for [specific trade]?", "[Tool A] vs [Tool B]?")

**Each answer must be:**
- 2–4 sentences
- Start with a direct answer (not "Great question!" or "That depends...")
- Include at least 1 specific detail (number, tool name, trade reference)

**Scoring:**
- 5–7 FAQs covering all 3 stages, direct answers = 20/20
- Right count but missing a stage = 15/20
- Answers are vague or start with hedging = 12/20
- Fewer than 5 FAQs = 8/20 or lower

**Fix:** Add missing FAQs for uncovered stages. Rewrite vague answers to lead with specifics.

### 3. Structured Data Readiness (15 points)

**Requirement:** Content maps cleanly to schema.org types without restructuring.

**Check for:**
- FAQs can map directly to `FAQPage` schema (each has `question` + `answer`)
- Tool recommendations can map to `Product` schema (name, price, rating, description)
- Guide steps can map to `HowTo` schema (step-by-step with clear names)
- Comparison tables have clear headers and consistent data per row

**Scoring:**
- All content maps to schema types = 15/15
- Minor restructuring needed (e.g., FAQ answers too long) = 10/15
- Major restructuring needed = 5/15

**Fix:** Restructure content so each schema-target element is self-contained.

### 4. Table/List Usage (15 points)

**Requirement:** Use tables and lists instead of prose for data that AI engines need to compare or extract.

**Must have at least:**
- 1 comparison table (if content type involves tools)
- Bullet lists for feature lists, criteria, pros/cons
- Pricing in table or structured format (not buried in prose)

**Scoring:**
- Tables and lists used for all comparative/list data = 15/15
- 1 area where prose should be a table = 10/15
- Multiple areas = 5/15 or lower

**Fix:** Convert prose comparisons to tables. Convert inline lists to bullet points.

### 5. Snippet-Friendly Structure (15 points)

**Requirement:** Headings (H2, H3) are clear, descriptive topics or questions — not clever, vague, or metaphorical.

**Good headings:**
- "What Is Construction Estimating Software?"
- "Procore vs Buildertrend: Pricing Comparison"
- "How to Choose Crew Scheduling Software"
- "Top 4 Invoicing Tools for Contractors (2025)"

**Bad headings:**
- "The Bottom Line" (what bottom line?)
- "Making the Right Choice" (about what?)
- "A Better Way" (vague)
- "The Verdict" (without the tools named)

**Scoring:**
- All headings are clear and descriptive = 15/15
- 1 vague heading = 10/15
- 2+ vague headings = 5/15 or lower

**Fix:** Rewrite vague headings to include the topic and be answerable by AI engines.

### 6. Internal Link Anchors (15 points)

**Requirement:** 3–5 natural internal link opportunities to other BUILTECH pages.

**Check for links to:**
- Related category pages (`/categories/[slug]`)
- Tool review pages (`/tools/[slug]`)
- Comparison pages (`/compare/[tool1]-vs-[tool2]`)
- Best-for pages (`/best/[slug]`)
- Guide pages (`/guides/[slug]`)

**Scoring:**
- 4–5 relevant internal links = 15/15
- 3 links = 12/15
- 1–2 links = 8/15
- 0 links = 3/15

**Fix:** Identify where related pages should be linked and add markdown link anchors.

## Output Format

```markdown
## Pass: GEO Citability — Score: [X]/100

### What's Working
- [List 2-3 GEO strengths]

### Improvements Needed
1. [DIRECT ANSWER] Section "[heading]" buries the answer in paragraph N. Move to first sentence.
2. [FAQ] Missing [stage] question. Suggest: "[question]"
3. [SCHEMA] FAQ answer too long for FAQPage schema — trim to 2-3 sentences.
4. [TABLE] "[description]" should be a comparison table, not prose.
5. [HEADING] "[heading text]" is vague. Suggest: "[specific heading]"
6. [LINK] Add internal link to [page] in Section N.

### Score Breakdown
| Criterion | Points | Score |
|-----------|--------|-------|
| Direct answer format | 20 | X/20 |
| FAQ quality | 20 | X/20 |
| Structured data readiness | 15 | X/15 |
| Table/list usage | 15 | X/15 |
| Snippet-friendly structure | 15 | X/15 |
| Internal link anchors | 15 | X/15 |
| **TOTAL** | **100** | **X/100** |
```

## Retry Logic

- Score >= 90: Output "PASS" and advance to Pass 5 (Voice)
- Score < 90: Apply fixes, re-score. Max 3 retries.
- After 3 retries if < 90: Flag for human review, advance with warning.
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-geo.md | head -5`
Expected: YAML frontmatter with `name: seo-content-geo`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-geo.md
git commit -m "feat: add seo-content-geo skill (Pass 4 — GEO citability)"
```

---

## Task 5: Create the Contractor Voice Pass Skill (`seo-content-voice`)

**Files:**
- Create: `.claude/skills/seo-content-voice.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-voice
description: >
  Contractor persona voice validation for construction tech content.
  Adopts a skeptical contractor perspective and scores 0-100 on practical value (35pts),
  authenticity (24pts), appropriate tone (21pts), and addressing real objections (20pts).
  Catches content that sounds like marketing instead of experience.
  Loops until 90+ or max 3 retries. Use standalone or as Pass 5 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content Voice — Pass 5

You are a skeptical general contractor with 20 years in the field. You've run residential and commercial projects, managed crews of 5 to 50, dealt with subs who don't show up, owners who don't pay, and software salespeople who promise the moon. You've tried 3 different project management tools and stuck with the one that actually worked on the job site.

Your job is to read this content and flag anything that doesn't ring true.

## Your Mindset

When you read content, you ask yourself:
- "Would I trust this advice?"
- "Has this writer actually dealt with this problem?"
- "Is this telling me something I can use, or is it just filling space?"
- "Would I send this to my business partner?"
- "Does this understand what my day actually looks like?"

You are not harsh for the sake of it. You respect good information. But you have zero patience for:
- People who talk about construction like they read about it on Wikipedia
- Marketing language that sounds like a software sales pitch
- Vague advice that wouldn't survive a real job site
- Content that talks about "contractors" like we're all the same

## Invocation

**Standalone:** Read the current file or editor selection. Score and fix.
**Pipeline:** Receive markdown from Pass 4 (GEO). Score, fix if needed, pass to Pass 6.

## Scoring Rubric (100 points)

### 1. Practical Value (35 points)

This is the most important criterion. Content must help a contractor make a real decision or take a real action.

**35/35 — Every section teaches or enables something specific:**
- "If you're running 10+ active projects, here's exactly how to evaluate scheduling software"
- Comparison tables a contractor can screenshot and share with their office manager
- Pricing breakdowns they can plug into their own numbers
- "If you're a 5-truck HVAC shop doing $1.5M, here's what your ROI looks like"

**25/35 — Most sections are useful but some are informational padding:**
- Section explains what estimating is (contractor already knows this — they want to know which tool is best)
- Generic feature lists without "why this matters on a job site"

**15/35 — Content reads like a research report, not a buying guide:**
- Lots of information, but nothing actionable
- "Here are 6 features to consider" without guidance on which matter most
- No decision thresholds or size-based recommendations

**5/35 — Content is obvious or unhelpful:**
- "Construction software helps with construction projects"
- Restating the category definition for 400 words

**How to fix low scores:**
- For every section, ask: "What can a contractor DO with this information?"
- Replace definitions with decision frameworks
- Add size-based recommendations ("under 5 crews → X, over 10 → Y")
- Include numbers they can plug into their own business

### 2. Authenticity (24 points)

Does this sound like it was written by someone with field experience?

**24/24 — Reads like a contractor wrote it:**
- Uses trade language naturally: "subs," "GC," "change orders," "punch list," "RFIs"
- References real situations: "when your concrete sub calls in sick at 5 AM"
- Knows the tools from use, not from feature pages: "Procore's mobile app actually works offline on remote sites — most don't"
- Mentions pain points that only come from experience: "the real problem isn't the software, it's getting your foreman to actually log hours"

**16/24 — Mostly authentic but some tells:**
- Uses trade terms but in a way that feels researched rather than natural
- Scenarios are plausible but generic
- Tool knowledge comes from marketing pages, not usage

**8/24 — Clearly written by an outsider:**
- "Stakeholders" instead of "the owner" or "your GC"
- "Workflow optimization" instead of "getting your guys to actually use it"
- No mention of real field challenges
- Software described only by feature lists

**Fix:** Replace outsider language with trade language. Replace generic scenarios with specific ones. Add details that show job-site knowledge.

### 3. Appropriate Tone (21 points)

Direct and no-nonsense. Not talking down. Not selling.

**21/21 — Talks to a contractor as an equal:**
- Straightforward advice without hedging
- Respects the reader's intelligence and experience
- Doesn't over-explain basics
- Doesn't use superlatives or hype

**14/21 — Mostly right but occasional slips:**
- One section gets preachy or over-explains
- Occasional "you should consider..." when it should be "here's what works..."
- Slightly formal or academic in places

**7/21 — Tone is wrong:**
- Condescending: "Many contractors don't realize..."
- Salesy: "You'll love how easy it is to..."
- Academic: "Research indicates that construction technology adoption..."
- Corporate: "Our analysis suggests that the optimal solution..."

**Fix:** Rewrite flagged sentences in the voice of one contractor advising another.

### 4. Addresses Real Objections (20 points)

Does the content acknowledge what a contractor is actually worried about?

**20/20 — Proactively addresses the hard questions:**
- "Yeah, it's $399/month — here's how to tell if that pays for itself in your operation"
- "Your crew will hate it for the first 2 weeks. Here's how to get past that"
- "Switching from QuickBooks mid-year is a pain. Here's when it's worth it and when it's not"
- "If you're a solo operator doing under $500K, you probably don't need this"

**13/20 — Addresses some objections but avoids the hardest ones:**
- Mentions cost but doesn't address whether it's worth it for small shops
- Talks about features but not crew adoption resistance
- Mentions "easy to use" without addressing the real learning curve

**7/20 — Avoids objections entirely:**
- All positive, no drawbacks
- "Easy to implement" without addressing switching pain
- No mention of who should NOT buy this
- No discussion of crew resistance

**Fix:** For each missing objection area, add a sentence or paragraph that addresses it honestly with specifics.

## Output Format

```markdown
## Pass: Contractor Voice — Score: [X]/100

### The Contractor's Verdict
[2-3 sentences in the contractor persona summarizing the overall impression]

### What Rings True
- [List 2-3 things that feel authentic and useful]

### What Doesn't Ring True
1. [PRACTICAL VALUE] Section "[heading]": [what's wrong] → [how to fix]
2. [AUTHENTICITY] Line N: "[text]" sounds like [outsider/marketer/academic] → "[replacement]"
3. [TONE] Section "[heading]": [tone issue] → [rewrite suggestion]
4. [OBJECTION] Missing: [objection not addressed] → [suggest where/how to add]

### Score Breakdown
| Criterion | Points | Score |
|-----------|--------|-------|
| Practical value | 35 | X/35 |
| Authenticity | 24 | X/24 |
| Appropriate tone | 21 | X/21 |
| Addresses real objections | 20 | X/20 |
| **TOTAL** | **100** | **X/100** |
```

## Retry Logic

- Score >= 90: Output "PASS" and advance to Pass 6 (Readability)
- Score < 90: Apply fixes, re-score. Max 3 retries.
- After 3 retries if < 90: Flag for human review, advance with warning.
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-voice.md | head -5`
Expected: YAML frontmatter with `name: seo-content-voice`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-voice.md
git commit -m "feat: add seo-content-voice skill (Pass 5 — contractor persona validation)"
```

---

## Task 6: Create the Readability Pass Skill (`seo-content-readability`)

**Files:**
- Create: `.claude/skills/seo-content-readability.md`

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-readability
description: >
  Final readability and structure polish for construction tech content.
  Scores 0-100 on word count, paragraph length, heading hierarchy, CTA placement,
  mobile scannability, internal link density, and meta description quality.
  Loops until 90+ or max 3 retries. Use standalone or as Pass 6 of /seo-content-engine.
metadata:
  version: 1.0.0
---

# SEO Content Readability — Pass 6

You are a technical SEO editor doing the final quality pass. Content has already passed slop check, E-E-A-T, GEO, and voice reviews. Your job is structural polish: make sure the page is the right length, scannable on mobile, well-linked, and has strong metadata.

## Invocation

**Standalone:** Read the current file or editor selection. Score and fix.
**Pipeline:** Receive markdown from Pass 5 (Voice). Score, fix if needed, present for user review.

## Content Type Targets

Read the frontmatter `type` field to determine targets:

| Type | Word Target | Min FAQs | Min Internal Links |
|------|------------|----------|-------------------|
| category | 2,500–3,500 | 5 | 4 |
| comparison | 1,500–2,000 | 5 | 3 |
| best-for | 1,200–1,800 | 5 | 3 |
| guide | 1,500–2,500 | 5 | 3 |

## Scoring Rubric (100 points)

### 1. Word Count (15 points)

**Count all body text** (excluding frontmatter and markdown syntax).

**Scoring:**
- Within target range = 15/15
- Within 10% of target range = 12/15
- Within 20% of target range = 8/15
- More than 20% over or under = 5/15 or lower

**Fix (under target):** Identify the thinnest section and suggest 100–200 words of expansion with specific content ideas.
**Fix (over target):** Identify the most verbose section and suggest cuts (filler sentences, redundant explanations).

### 2. Paragraph Length (15 points)

**Requirement:** No paragraph longer than 4 sentences.

**Why:** Mobile users scan. Walls of text bounce.

**Scoring:**
- All paragraphs 4 sentences or fewer = 15/15
- 1 long paragraph = 12/15
- 2 long paragraphs = 8/15
- 3+ = 5/15 or lower

**Fix:** Split long paragraphs at natural break points. Each paragraph should cover one thought.

### 3. Heading Hierarchy (15 points)

**Requirements:**
- H1 (exactly 1, matching the page title)
- H2 for main sections (no skipping to H3 without H2)
- H3 for subsections within H2s
- No H4+ unless genuinely needed
- Heading text includes keywords naturally

**Scoring:**
- Clean hierarchy, keyword-rich headings = 15/15
- Minor issue (one skipped level) = 10/15
- Multiple hierarchy issues = 5/15

**Fix:** Restructure headings to follow proper hierarchy. Rewrite keyword-poor headings.

### 4. CTA Placement (15 points)

**Requirement:** Clear call-to-action after tool recommendations — not buried only at the bottom.

**Ideal CTA structure:**
- After each tool recommendation: "Try [Tool] free for 14 days" or "See [Tool] pricing"
- After the comparison/verdict section: "Ready to choose? Start with [top pick]"
- End of page: Final CTA summarizing the best option

**Scoring:**
- CTAs after tool recs + mid-page + end = 15/15
- CTAs only at end = 10/15
- No clear CTAs = 5/15

**Fix:** Add CTA text after each tool recommendation section. Format as: "[Tool Name] — [brief value prop]. [Action link text]."

### 5. Mobile Scannability (15 points)

**Requirements:**
- Short paragraphs (covered above)
- Bullet points for lists of 3+ items
- Tables for comparisons (not inline prose)
- Bold for key takeaways within paragraphs
- No section longer than 600 words without a visual break (table, list, or subheading)

**Scoring:**
- Fully scannable = 15/15
- 1 dense section = 10/15
- Multiple dense sections = 5/15

**Fix:** Break dense sections with bullet points, subheadings, or tables. Bold key phrases.

### 6. Internal Link Density (10 points)

**Requirement:** 3–5 internal links to other BUILTECH pages, using descriptive anchor text.

**Good anchor text:** "compare Procore vs Buildertrend features"
**Bad anchor text:** "click here" or "learn more"

**Scoring:**
- 4–5 links with good anchors = 10/10
- 3 links or some weak anchors = 7/10
- 1–2 links = 4/10
- 0 links = 0/10

**Fix:** Suggest specific pages to link and where in the content the link fits naturally.

### 7. Meta Description (15 points)

**Requirements:**
- 150–160 characters
- Includes primary keyword
- Compelling click trigger (not just a summary)
- No truncation (check character count)

**Good:** "Compare the top 4 construction estimating tools for 2025. Real pricing, honest reviews, and ROI calculators for contractors running $500K–$5M in projects."

**Bad:** "Learn about construction estimating software and find the best tool for your business needs."

**Scoring:**
- Correct length + keyword + compelling = 15/15
- Correct length but generic = 10/15
- Too long/short or missing keyword = 5/15

**Fix:** Rewrite meta description to hit all 3 criteria. Include a specific detail (pricing, number of tools, trade reference).

## Output Format

```markdown
## Pass: Readability — Score: [X]/100

### Structural Summary
- Word count: [X] (target: [range])
- Paragraphs over 4 sentences: [N]
- Heading levels used: H1, H2, H3
- Internal links: [N]
- Meta description: [X] characters

### What's Working
- [List 2-3 structural strengths]

### Fixes Needed
1. [WORD COUNT] [Over/Under] by [N] words. Section "[heading]" is [thinnest/most verbose].
2. [PARAGRAPH] Section "[heading]", paragraph N: [X] sentences → split at "[break point]"
3. [HEADING] "[heading]" skips from H2 to H4. Add H3 or restructure.
4. [CTA] Missing CTA after [tool name] recommendation. Add: "[suggested CTA]"
5. [SCAN] Section "[heading]" is [N] words with no visual break. Add [table/list/subheading].
6. [LINK] Add link to [page] using anchor "[anchor text]" in Section [N].
7. [META] Meta description is [X] chars. Rewrite: "[suggested meta]"

### Score Breakdown
| Criterion | Points | Score |
|-----------|--------|-------|
| Word count | 15 | X/15 |
| Paragraph length | 15 | X/15 |
| Heading hierarchy | 15 | X/15 |
| CTA placement | 15 | X/15 |
| Mobile scannability | 15 | X/15 |
| Internal link density | 10 | X/10 |
| Meta description | 15 | X/15 |
| **TOTAL** | **100** | **X/100** |
```

## Retry Logic

- Score >= 90: Output "PASS — content ready for user review"
- Score < 90: Apply fixes, re-score. Max 3 retries.
- After 3 retries if < 90: Flag for human review with remaining issues listed.

## After This Pass

This is the final automated pass. On PASS:
1. Present the complete markdown to the user for review
2. Ask: "Content has cleared all 6 passes. Review the markdown above. Approve to convert to TypeScript, or request changes."
3. Wait for user approval before proceeding to TypeScript conversion.
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-readability.md | head -5`
Expected: YAML frontmatter with `name: seo-content-readability`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-readability.md
git commit -m "feat: add seo-content-readability skill (Pass 6 — structure and SEO polish)"
```

---

## Task 7: Create the Orchestrator Skill (`seo-content-engine`)

**Files:**
- Create: `.claude/skills/seo-content-engine.md`

This is the main entry point that ties all passes together.

- [ ] **Step 1: Create the skill file**

```markdown
---
name: seo-content-engine
description: >
  Orchestrator for the SEO content pipeline. Generates and iteratively refines
  construction tech affiliate content through 6 scored passes (draft, slop check,
  E-E-A-T, GEO citability, contractor voice, readability), each requiring 90/100
  to advance. Supports category, comparison, best-for, and guide pages.
  Outputs markdown for review, then TypeScript data objects on approval.
metadata:
  version: 1.0.0
---

# SEO Content Engine

You are the orchestrator for BUILTECH's content pipeline. You manage the full lifecycle of a content page: from initial draft through 5 refinement passes to final TypeScript output. Every page must clear a 90/100 bar on each pass before shipping.

## Invocation

```
/seo-content-engine --type=category --slug=financial-management
/seo-content-engine --type=comparison --slug=procore-vs-buildertrend
/seo-content-engine --type=best-for --slug=best-hvac-software
/seo-content-engine --type=guide --slug=hvac-estimating-guide
```

If `--type` or `--slug` are missing, ask:
1. "What content type? (category, comparison, best-for, guide)"
2. "What slug? (e.g., financial-management, procore-vs-buildertrend)"

## Pipeline

Run these passes in order. Each pass uses its own skill file.

```
Pass 1: seo-content-draft        → Generate initial content
Pass 2: seo-content-slop-check   → Remove AI slop (90+ to advance)
Pass 3: seo-content-eeat         → Enhance E-E-A-T signals (90+ to advance)
Pass 4: seo-content-geo          → Optimize GEO citability (90+ to advance)
Pass 5: seo-content-voice        → Validate contractor voice (90+ to advance)
Pass 6: seo-content-readability  → Polish structure and SEO (90+ to advance)
```

## Orchestration Rules

### Before Starting

1. Create output directories if they don't exist:
   - `docs/content-pipeline/`
   - `docs/content-drafts/`

2. Check if a pipeline state file already exists for this slug at `docs/content-pipeline/{slug}-pipeline.md`. If yes, ask: "Found existing pipeline for {slug}. Resume from where it left off, or start fresh?"

3. Initialize the pipeline state file:

```markdown
# {slug} — Pipeline Status
**Type:** {type}
**Started:** {today's date}
**Last Updated:** {today's date}

| Pass | Score | Attempts | Status |
|------|-------|----------|--------|
| Draft | — | 0 | ⏳ Pending |
| Slop Check | — | 0 | ⏳ Pending |
| E-E-A-T | — | 0 | ⏳ Pending |
| GEO | — | 0 | ⏳ Pending |
| Voice | — | 0 | ⏳ Pending |
| Readability | — | 0 | ⏳ Pending |
| User Review | — | — | ⏳ Pending |
| TypeScript | — | — | ⏳ Pending |
```

### Running Each Pass

For each pass (2–6):

1. **Invoke the pass skill** with the current markdown content
2. **Receive the score and feedback**
3. **Update the pipeline state file** with the score and attempt count
4. **If score >= 90:** Mark pass as complete, advance to next pass
5. **If score < 90:** Apply the fixes suggested by the pass, increment attempt count, re-invoke the pass
6. **If 3 attempts exhausted and still < 90:** Mark as "⚠️ Flagged" in pipeline state, notify the user, and advance

**Between passes**, briefly report to the user:
- "Pass 2 (Slop Check): 94/100 — PASSED on attempt 2"
- "Pass 3 (E-E-A-T): 87/100 — fixing 3 issues, re-scoring..."

### After All Passes Complete

1. Update pipeline state: all passes marked ✅
2. Save the final markdown to `docs/content-drafts/{slug}.md`
3. Present the full markdown to the user
4. Ask: "All 6 passes cleared 90+. Review the content above. Type 'approve' to convert to TypeScript, or tell me what to change."

### On User Approval — TypeScript Conversion

Read the target TypeScript interface from `app/data/schemaTypes.ts` based on content type:

| Type | Interface | Target File |
|------|-----------|-------------|
| category | `CategoryPage` | `app/data/categoryContent.ts` |
| comparison | `ComparisonDetailPage` | `app/data/comparisonData.ts` |
| best-for | `BestForPage` | `app/data/seoPages.ts` |
| guide | Guide object | `app/data/guidePages.ts` |

Convert the markdown content to a complete TypeScript object:

**For category pages**, map to `CategoryPage`:
```typescript
{
  slug: "{slug}",
  categoryId: "{categoryId from taxonomy}",
  language: "en",
  title: "{from meta}",
  metaDescription: "{from meta}",
  h1: "{from H1}",
  introduction: "{first section HTML}",
  whyItMatters: "{section 2 HTML}",
  toolsToCompare: ["{toolId1}", "{toolId2}", "{toolId3}"],
  comparisonTableColumns: [
    { key: "feature1", label: "Feature 1" },
    // ...from comparison section
  ],
  sections: [
    { heading: "{H2 text}", content: "{section HTML}", type: "text" },
    // ...for each section
  ],
  primaryCTA: "{CTA text}",
  primaryToolId: "{top recommended tool ID}",
  secondaryToolIds: ["{tool2}", "{tool3}"],
  keywords: ["{primary}", "{secondary1}", "{secondary2}"],
  lastUpdated: "{today ISO 8601}",
  faqs: [
    { question: "{Q1}", answer: "{A1}" },
    // ...for each FAQ
  ],
  relatedCategories: ["{related1}", "{related2}"],
  relatedTools: ["{tool1}", "{tool2}", "{tool3}"],
  published: false,
  featured: false
}
```

**Output the TypeScript object** and tell the user:
- "TypeScript object ready. Paste into `{target file}` in the page content array."
- "Set `published: true` when ready to go live."

Update pipeline state: TypeScript row marked ✅.

### On User Changes Requested

If the user requests changes after reviewing the markdown:
1. Apply the changes
2. Re-run the most relevant pass (or all passes if changes are substantial)
3. Present again for review

## Error Handling

- If a data file can't be found (e.g., `categoryTaxonomy.ts`), tell the user and ask for the file path
- If the slug doesn't match any category/tool, list available slugs and ask the user to pick
- If Passes 2–6 all fail after 3 retries, present the best version with all warnings and ask the user how to proceed
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `cat .claude/skills/seo-content-engine.md | head -5`
Expected: YAML frontmatter with `name: seo-content-engine`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/seo-content-engine.md
git commit -m "feat: add seo-content-engine orchestrator skill (main entry point)"
```

---

## Task 8: Create Output Directories and Verify Full System

**Files:**
- Create: `docs/content-pipeline/.gitkeep`
- Create: `docs/content-drafts/.gitkeep`

- [ ] **Step 1: Create output directories with .gitkeep files**

```bash
mkdir -p docs/content-pipeline docs/content-drafts
touch docs/content-pipeline/.gitkeep docs/content-drafts/.gitkeep
```

- [ ] **Step 2: Verify all 7 skill files exist**

```bash
ls -la .claude/skills/seo-content-*.md
```

Expected output: 7 files:
- `seo-content-draft.md`
- `seo-content-eeat.md`
- `seo-content-engine.md`
- `seo-content-geo.md`
- `seo-content-readability.md`
- `seo-content-slop-check.md`
- `seo-content-voice.md`

- [ ] **Step 3: Verify each skill has valid frontmatter**

```bash
for f in .claude/skills/seo-content-*.md; do echo "=== $f ==="; head -6 "$f"; echo; done
```

Expected: Each file starts with `---`, has `name:` and `description:` fields, and closes with `---`.

- [ ] **Step 4: Commit output directories**

```bash
git add docs/content-pipeline/.gitkeep docs/content-drafts/.gitkeep
git commit -m "chore: add content pipeline output directories"
```

- [ ] **Step 5: Verify the complete system**

Run a quick check that all pieces reference each other correctly:
```bash
grep -l "seo-content-draft" .claude/skills/seo-content-engine.md
grep -l "seo-content-slop-check" .claude/skills/seo-content-engine.md
grep -l "seo-content-eeat" .claude/skills/seo-content-engine.md
grep -l "seo-content-geo" .claude/skills/seo-content-engine.md
grep -l "seo-content-voice" .claude/skills/seo-content-engine.md
grep -l "seo-content-readability" .claude/skills/seo-content-engine.md
```

Expected: All 6 grep commands return `.claude/skills/seo-content-engine.md`

---

## Summary

| Task | Skill | Purpose |
|------|-------|---------|
| 1 | `seo-content-draft` | Pass 1 — generate initial content from template + data |
| 2 | `seo-content-slop-check` | Pass 2 — AI slop detection and removal |
| 3 | `seo-content-eeat` | Pass 3 — E-E-A-T signal enhancement |
| 4 | `seo-content-geo` | Pass 4 — GEO citability optimization |
| 5 | `seo-content-voice` | Pass 5 — contractor persona voice validation |
| 6 | `seo-content-readability` | Pass 6 — structure, readability, SEO polish |
| 7 | `seo-content-engine` | Orchestrator — routes, scores, loops, converts |
| 8 | Output dirs + verification | Infrastructure and system check |

**Total: 8 tasks, 7 skill files, 0 TypeScript code changes.**

After implementation, invoke with:
```
/seo-content-engine --type=category --slug=financial-management
```
