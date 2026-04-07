# Phase 1: Programmatic SEO System

## Overview

This is a complete, standalone affiliate SEO system for construction software reviews. It generates category landing pages with tool comparisons, affiliate CTAs, and SEO optimization—all from structured data.

**Status**: ✅ Complete & tested  
**Branch**: `claude/analyze-site-structure-2CrSz`  
**Build**: Passing, 15 category pages prerendered

---

## What's Inside

### Data Files

```
app/data/
├── categoryTaxonomy.ts          # 50 job-function categories with keywords
├── toolDataset.ts               # 40+ tools with affiliate metadata
├── schemaTypes.ts               # TypeScript interfaces
└── categoryContent.ts            # 15 seed category pages (examples)
```

### Components

```
app/pages/
└── CategoryPage.tsx              # Renders category pages (SEO-optimized)

app/routes.ts                      # /categories/:slug route added
```

### Build Scripts

```
scripts/
├── prerender.ts                  # Now includes category route prerendering
└── generate-sitemap.ts           # Now includes category URLs
```

### Prompts

```
prompts/
└── generateCategoryContent.md    # 8 Claude prompts for scaling to all 50 categories
```

---

## Quick Start

### View a Category Page

The system is already integrated. Category pages are accessible at:
- `/categories/project-estimating`
- `/categories/field-crew-scheduling`
- `/categories/customer-invoicing`
- etc.

Each page includes:
- SEO metadata (title, description, keywords)
- JSON-LD schemas (Article type)
- Tool comparison table
- FAQ section
- CTA buttons with affiliate links
- Related category links

### Build & Deploy

```bash
npm run build
```

This will:
1. Build the Vite app
2. **Pre-render all category pages** to static HTML
3. **Generate sitemap.xml** with category URLs
4. **Generate RSS feed** with guides

All category pages are in `dist/categories/`.

### Generate Remaining Categories

Use the 8 prompts in `prompts/generateCategoryContent.md` to generate content for the remaining 35 categories:

1. Copy a prompt from the file
2. Paste into Claude (or use the Claude API)
3. Provide category details
4. Get back formatted TypeScript content
5. Add to `categoryContent.ts`
6. Rebuild

**Estimated time**: 2-3 hours to generate all 50 categories using prompts

---

## Architecture

### Data Structure

All data is TypeScript for type safety and easy scaling:

```typescript
// Category: What contractors search for
interface Category {
  id: string
  slug: string
  name: string
  description: string
  primaryKeyword: string
  relatedKeywords: string[]
  affiliateIntentLevel: 'high' | 'medium' | 'low'
}

// Tool: Software with affiliate metadata
interface Tool {
  id: string
  name: string
  affiliateUrl?: string
  affiliateProgramExists: boolean
  estimatedCommissionRate?: string
  targetCategories: string[]
  comparisonFeatures: Record<string, boolean>
}

// Page: Rendered content
interface CategoryPage {
  slug: string
  categoryId: string
  title: string
  metaDescription: string
  toolsToCompare: string[]
  sections: Array<{ heading: string, content: string }>
  faqs?: Array<{ question: string, answer: string }>
  primaryToolId: string
}
```

### Routing

New route added to `app/routes.ts`:
```typescript
{ path: "categories/:slug", Component: withSuspense(CategoryPage) }
```

### SEO

Each category page includes:
- **Meta tags**: title, description, og:tags, canonical URL
- **JSON-LD schemas**: Article type with author/publisher/dateModified
- **Structured data**: Keywords, author organization
- **Internal linking**: Related categories, tool pages

### Affiliate Revenue

Every tool in `toolDataset.ts` includes:
- `affiliateUrl`: Direct affiliate link
- `estimatedCommissionRate`: Expected commission (20-30%)
- `affiliateNetwork`: How affiliate program works

CTAs point to affiliate URLs for monetization.

---

## Scaling Strategy

### Current State
- 50 categories defined ✅
- 40+ tools with affiliate metadata ✅
- 15 category pages fully written ✅
- 8 content generation prompts ready ✅

### Scale to All 50 Categories

1. **Use Prompt #1** (Overview) for remaining 35 categories
2. **Use Prompt #2** (FAQs) for remaining 35 categories
3. **Use Prompt #4** (SEO Metadata) for remaining 35 categories
4. **Use Prompt #8** (Complete) to assemble each into CategoryPage
5. **Add to categoryContent.ts**
6. **Run `npm run build`**

Each iteration takes ~5-10 minutes.

### Scale Beyond 50 Categories

Current architecture supports:
- More categories (add to `categoryTaxonomy.ts`)
- More tools (add to `toolDataset.ts`)
- More comparison variations (add "best-for" pages)
- More detailed guides (use existing `guidePages` system)

**Potential scope**: 1,000+ affiliate pages from combinations of categories, tools, and content types.

---

## Integration Notes (Phase 2)

When integrating with James's site:

1. **No dependencies on existing structures**: This system is standalone
2. **Uses existing Vite + React Router**: Fits directly into current architecture
3. **Reuses existing components**: StarRating, layout components, styling
4. **Follows existing patterns**: Same build scripts, pre-rendering, sitemap approach
5. **Easy to customize**: All content is data-driven, not hardcoded

### What Might Change in Phase 2

- Color scheme (site branding)
- Tool selection (which tools to feature per category)
- CTA copy and landing pages
- Related category linking (based on site structure)
- Content customization (tone, specific details)

None of these require changing the core system—just the data.

---

## Testing Checklist

- ✅ Build passes with no errors
- ✅ All 15 category pages prerendered to `dist/categories/`
- ✅ Sitemap includes all category URLs
- ✅ JSON-LD schemas properly injected
- ✅ SEO metadata complete (title, description, keywords)
- ✅ Routes accessible at `/categories/:slug`
- ✅ Affiliate links populated in CTAs

---

## Files to Modify

When adding new categories:

1. **categoryContent.ts**: Add new CategoryPage objects
2. **Run build**: `npm run build` regenerates everything
3. **Commit**: Push changes to branch

Everything else (routing, prerendering, sitemap) is automatic.

---

## Next Steps

### Short term (1-2 hours)
- Use prompts to generate remaining 35 categories
- Add to `categoryContent.ts`
- Test build

### Medium term (2-3 days)
- Share with James for integration feedback
- Customize CTAs and landing page links
- Adjust tool selection per category

### Long term (Phase 2)
- Integrate with James's site structure
- Add any site-specific customizations
- Deploy and monitor performance
- Scale to additional content types (guides, comparisons, best-for pages)

---

## Resources

- **Category definitions**: `app/data/categoryTaxonomy.ts`
- **Tool data**: `app/data/toolDataset.ts`
- **Content generation**: `prompts/generateCategoryContent.md`
- **Example pages**: `app/data/categoryContent.ts` (15 examples)
- **Component**: `app/pages/CategoryPage.tsx`
- **Build scripts**: `scripts/prerender.ts`, `scripts/generate-sitemap.ts`

---

## Questions?

This system is designed to be:
- **Self-contained**: Works without site integration
- **Scalable**: From 50 categories to 1,000+ pages
- **SEO-optimized**: Proper schemas, metadata, internal linking
- **Affiliate-ready**: All tools have commission rates and links
- **Easy to extend**: Add categories, tools, or content types

All structure is in data files, not code. Modify data → rebuild → deploy.
