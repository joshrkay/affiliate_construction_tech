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
