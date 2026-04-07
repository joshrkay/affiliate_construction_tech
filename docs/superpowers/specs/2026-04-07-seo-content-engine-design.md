# SEO Content Engine — Design Spec

**Date:** 2026-04-07
**Status:** Draft
**Approach:** Orchestrator + Pass Skills (Approach 2)

---

## Overview

A modular skill system that generates high-quality, ranking-ready content for the BUILTECH construction tech affiliate site. Content goes through a write-then-refine iterative loop with 6 sequential passes, each scored against a rubric with a 90/100 minimum threshold. The system handles all content types (categories, comparisons, best-for, guides) and outputs markdown for review before converting to TypeScript data objects.

The core problem this solves: AI-generated content defaults to slop. This system forces every page through structured refinement that catches vague claims, marketing speak, weak E-E-A-T signals, poor AI-discoverability, and inauthentic voice — before it ships.

---

## Skill Architecture

### 7 Skill Files

All located in `.claude/skills/`:

| Skill File | Invocation | Role |
|------------|-----------|------|
| `seo-content-engine.md` | `/seo-content-engine` | Orchestrator — runs full pipeline |
| `seo-content-draft.md` | Auto or `/seo-content-draft` | Generates initial draft from template |
| `seo-content-slop-check.md` | Auto or `/seo-content-slop-check` | AI slop detection & removal |
| `seo-content-eeat.md` | Auto or `/seo-content-eeat` | E-E-A-T signal enhancement |
| `seo-content-geo.md` | Auto or `/seo-content-geo` | GEO citability & AI-discoverability |
| `seo-content-voice.md` | Auto or `/seo-content-voice` | Contractor persona validation |
| `seo-content-readability.md` | Auto or `/seo-content-readability` | Final structure, readability, SEO polish |

### Invocation

```bash
# Full pipeline
/seo-content-engine --type=category --slug=financial-management
/seo-content-engine --type=comparison --slug=procore-vs-buildertrend
/seo-content-engine --type=best-for --slug=best-hvac-software
/seo-content-engine --type=guide --slug=hvac-estimating-guide

# Standalone pass on existing content
/seo-content-slop-check    # runs on current file/selection
/seo-content-voice         # runs on current file/selection
```

---

## Content Type Templates

The orchestrator selects the right template based on `--type`:

### Category Pages (7-section TIER_1 template)

- **Word target:** 2,500–3,500
- **Sections:**
  1. What Is [Category]? (250–400 words)
  2. The Real Cost of [Manual Way] (300–400 words)
  3. [Category] vs [Old Way] (250–350 words)
  4. Key Features to Compare (300–400 words)
  5. How to Choose [Category] Software (400–500 words)
  6. Top [Category] Software (2025) (400–600 words)
  7. [Category] Software Pricing & ROI (250–400 words)
  8. FAQs (5–7 questions, awareness → consideration → decision)

- **Data sources:** `categoryTaxonomy.ts` (keywords, search volume), `toolDataset.ts` (tools, pricing, affiliate links)

### Comparison Pages (Head-to-head template)

- **Word target:** 1,500–2,000
- **Sections:**
  1. Introduction — who this comparison is for
  2. Side-by-side feature table
  3. Category-by-category breakdown (3–5 categories)
  4. Pricing comparison
  5. Verdict — who should pick which
  6. FAQs (5–7 questions)

- **Data sources:** `comparisonData.ts`, `toolDataset.ts`

### Best-For Pages (Listicle template)

- **Word target:** 1,200–1,800
- **Sections:**
  1. Introduction — the problem and who this is for
  2. How we selected these tools (criteria)
  3. Tool picks (3–5 tools, each with: best for, why, pricing, limitation)
  4. Comparison table
  5. FAQs (5–7 questions)

- **Data sources:** `seoPages.ts`, `toolDataset.ts`

### Guide Pages (Long-form template)

- **Word target:** 1,500–2,500
- **Sections:** Flexible based on topic
  1. Introduction — what you'll learn
  2. Core content sections (3–6 sections)
  3. Step-by-step how-to (if applicable)
  4. Expert tips / common mistakes
  5. FAQs (5–7 questions)

- **Data sources:** `guidePages.ts`, relevant category/tool data

---

## Pipeline Flow

```
Draft → Slop Check → E-E-A-T → GEO → Voice → Readability → [User Review] → TypeScript Convert
```

### Pass Execution Rules

1. Each pass reads current markdown content
2. Evaluates against pass-specific rubric
3. Scores 0–100
4. If score >= 90 → advance to next pass
5. If score < 90 → output specific fix instructions, apply fixes, re-score
6. Max 3 retry loops per pass
7. If still < 90 after 3 retries → flag for human review, advance with warning

### Score Output Format

Every pass outputs:

```markdown
## Pass: [Name] — Score: 82/100

### What's Working
- [Specific positive findings]

### Failing Criteria (fix these)
1. [CATEGORY] "exact problematic text" → suggested replacement
2. [CATEGORY] Description of issue → specific fix instruction
3. [CATEGORY] Issue → fix

### After Fixes → Re-score
```

### Pipeline State Tracking

Progress saved to `docs/content-pipeline/{slug}-pipeline.md`:

```markdown
# {slug} — Pipeline Status
**Type:** category
**Started:** 2026-04-07
**Last Updated:** 2026-04-07

| Pass | Score | Attempts | Status |
|------|-------|----------|--------|
| Draft | — | 1 | ✅ Complete |
| Slop Check | 94 | 2 | ✅ Complete |
| E-E-A-T | 91 | 3 | ✅ Complete |
| GEO | 87 | 2 | 🔄 In Progress |
| Voice | — | 0 | ⏳ Pending |
| Readability | — | 0 | ⏳ Pending |
| User Review | — | — | ⏳ Pending |
| TypeScript | — | — | ⏳ Pending |
```

---

## Pass Scoring Rubrics

### Pass 1 — Draft (`seo-content-draft`)

Generative pass. No scoring. Loads the content type template, pulls data from the relevant `app/data/*.ts` sources, and produces a complete first draft in markdown.

### Pass 2 — Slop Check (`seo-content-slop-check`)

| Criterion | Weight | Detection |
|-----------|--------|-----------|
| Buzzword usage | 20pts | Scan for: streamline, optimize, leverage, facilitate, innovative, cutting-edge, powerful, robust, seamless |
| Generic openings | 15pts | First sentence pattern match: "In today's...", "As the construction industry...", "When it comes to..." |
| Vague claims | 20pts | Sentences with no numbers: "save time", "increase efficiency", "improve productivity" |
| Passive voice | 10pts | "Estimates are generated" vs "You generate estimates" |
| Marketing speak | 15pts | "Unlock possibilities", "take your business to the next level", "game-changer" |
| Exclamation points | 5pts | Count > 0 = deduction |
| Filler sentences | 15pts | Sentences that could be deleted without losing information |

**90+ means:** Zero AI slop markers. Every sentence earns its place.

### Pass 3 — E-E-A-T (`seo-content-eeat`)

| Criterion | Weight | What It Checks |
|-----------|--------|----------------|
| Specific numbers | 20pts | Dollar amounts, hours saved, crew sizes, percentages — at least 1 per section |
| Real-world examples | 20pts | Scenarios a contractor would recognize ("a 15-person framing crew working 3 job sites") |
| Honest limitations | 15pts | Each tool recommendation mentions at least 1 drawback |
| Source-worthy claims | 15pts | Key stats attributed or verifiable (industry reports, vendor data) |
| Decision framework | 15pts | Reader can use the content to actually make a choice, not just learn about options |
| Contractor-relevant concerns | 15pts | Addresses: cost, learning curve, mobile access, crew adoption, switching cost |

**90+ means:** Content reads like it was written by someone who's worked with contractors, not someone who Googled "construction software."

### Pass 4 — GEO Citability (`seo-content-geo`)

| Criterion | Weight | What It Checks |
|-----------|--------|----------------|
| Direct answer format | 20pts | First paragraph of each section answers the section's question in <50 words |
| FAQ quality | 20pts | 5–7 FAQs covering awareness → consideration → decision stages |
| Structured data readiness | 15pts | Content maps cleanly to FAQ schema, Product schema, HowTo schema |
| Table/list usage | 15pts | Comparison tables, feature lists, pricing breakdowns — not just prose |
| Snippet-friendly structure | 15pts | H2s are questions or clear topics, not clever/vague headings |
| Internal link anchors | 15pts | Natural link opportunities to related categories, tools, comparisons |

**90+ means:** AI search engines can extract clear, citable answers from every section.

### Pass 5 — Contractor Voice (`seo-content-voice`)

Adopts a **skeptical contractor persona**. Reads through asking:

- "Would I trust this advice?"
- "Has the writer actually dealt with this problem?"
- "Is this telling me something useful or just filling space?"
- "Would I forward this to my business partner?"

| Criterion | Weight | What It Checks |
|-----------|--------|----------------|
| Practical value | **35pts** | Content helps a contractor make a real decision. Actionable, not informational fluff. |
| Authenticity | **24pts** | Writing sounds like experience, not research. Uses trade language naturally. |
| Appropriate tone | **21pts** | Direct, no-nonsense. Not condescending, not salesy, not academic. |
| Addresses real objections | **20pts** | Acknowledges switching pain, cost concerns, crew resistance, learning curve. |

Flags content that feels:
- Written by someone who's never been on a job site
- Talking *about* contractors instead of *to* them
- Using "you" but clearly meaning a generic audience
- Recommending tools without acknowledging real switching pain

**90+ means:** A GC reading this would think "yep, that's how it works" — not "this was written by a marketing intern."

### Pass 6 — Readability (`seo-content-readability`)

| Criterion | Weight | Target |
|-----------|--------|--------|
| Word count | 15pts | Within target range for content type |
| Paragraph length | 15pts | No paragraph > 4 sentences |
| Heading hierarchy | 15pts | Logical H2 → H3 flow, no skipped levels |
| CTA placement | 15pts | Clear CTA after tool recommendations, not just at bottom |
| Mobile scannability | 15pts | Short paragraphs, bullet points, tables break up walls of text |
| Internal link density | 10pts | 3–5 internal links to related pages |
| Meta description | 15pts | 150–160 chars, includes primary keyword, compelling click trigger |

**90+ means:** Clean, scannable, well-structured page that hits its word count target.

---

## Output & TypeScript Conversion

### Two-stage output

**Stage 1 — Markdown review:**
After all 6 passes clear 90+, the orchestrator presents the final markdown for user review. User can request changes or approve.

**Stage 2 — TypeScript conversion:**
On approval, the skill converts markdown to the matching TypeScript interface and outputs the complete object.

### Output targets

| Content Type | Target File | Interface |
|-------------|------------|-----------|
| `category` | `app/data/categoryContent.ts` | `CategoryPage` |
| `comparison` | `app/data/comparisonData.ts` | Comparison object |
| `best-for` | `app/data/seoPages.ts` | SEO page object |
| `guide` | `app/data/guidePages.ts` | Guide page object |

### TypeScript object includes

- All content sections as HTML strings
- SEO metadata (title, metaDescription, h1, keywords)
- FAQ array (question/answer pairs, schema-ready)
- Related categories and tools (for internal linking)
- `published` and `lastUpdated` dates
- Language field (`'en'` default, `'es'` for Spanish)

The skill does NOT auto-insert into the data file. It outputs the object and specifies exactly where to paste it. User controls what ships.

---

## Standalone Pass Usage

Any pass can run independently on existing content for refresh or quality checks.

### Behavior

1. Reads current file or editor selection
2. Runs that single pass's rubric
3. Scores and outputs fix instructions
4. Same 90/100 threshold and 3-retry loop
5. Does NOT advance to other passes
6. Does NOT save pipeline state

### Use Cases

| Scenario | Command |
|----------|---------|
| Published page feels "off" — check the voice | `/seo-content-voice` |
| Competitor outranking you — boost E-E-A-T signals | `/seo-content-eeat` |
| Page not appearing in AI search results | `/seo-content-geo` |
| Refreshing old content — quick slop sweep | `/seo-content-slop-check` |
| Page too long/short or poorly structured | `/seo-content-readability` |

---

## Data Dependencies

The draft pass pulls from these project files:

| File | Data Used |
|------|----------|
| `app/data/categoryTaxonomy.ts` | Category keywords, search volume, affiliate intent level |
| `app/data/toolDataset.ts` | Tool names, pricing, features, affiliate URLs, commission rates |
| `app/data/categoryContent.ts` | Existing category content (for reference/expansion) |
| `app/data/comparisonData.ts` | Existing comparison data |
| `app/data/seoPages.ts` | SEO page definitions |
| `app/data/guidePages.ts` | Existing guide content |
| `app/data/schemaTypes.ts` | TypeScript interfaces for output conversion |
| `prompts/EXPANDED_TEMPLATE_GUIDE.md` | 7-section template structure |
| `TIER_1_CONTENT_GUIDE.md` | Voice, tone, quality standards |

---

## File Locations

### Skills (to be created)

```
.claude/skills/
├── seo-content-engine.md
├── seo-content-draft.md
├── seo-content-slop-check.md
├── seo-content-eeat.md
├── seo-content-geo.md
├── seo-content-voice.md
└── seo-content-readability.md
```

### Pipeline state output

```
docs/content-pipeline/
├── financial-management-pipeline.md
├── project-estimating-pipeline.md
└── ...
```

### Content output (before TypeScript conversion)

```
docs/content-drafts/
├── financial-management.md
├── procore-vs-buildertrend.md
└── ...
```
