---
name: affiliate-construction-tech-patterns
description: Coding patterns and workflows for the BUILTECH construction tech affiliate SEO site (React/Vite/TypeScript)
version: 1.0.0
source: local-git-analysis
analyzed_commits: 159
---

# Affiliate Construction Tech Patterns

## Tech Stack

- **Framework**: React 18 + React Router 7 (SPA, not Next.js)
- **Build**: Vite + TypeScript
- **Styling**: Tailwind CSS + Radix UI components
- **Deployment**: Vercel (static SPA with prerendered pages)
- **AI Content Generation**: Local Ollama (gemma4) via OpenAI SDK compatibility layer
- **Analytics**: Google Analytics (GA4) via `@google-analytics/data`

## Build Pipeline

The build process is multi-stage:

```bash
vite build → prerender.ts → generate-sitemap.ts → generate-llms-full.ts → generate-feed.ts
```

1. `vite build` - Standard Vite production build
2. `scripts/prerender.ts` - Pre-render static HTML for SEO pages
3. `scripts/generate-sitemap.ts` - Generate XML sitemap
4. `scripts/generate-llms-full.ts` - Generate llms.txt for AI discoverability
5. `scripts/generate-feed.ts` - Generate RSS feed

## Code Architecture

```
app/
├── components/         # React components
│   ├── figma/          # Figma-imported components
│   ├── layout/         # Layout wrappers
│   ├── modals/         # Modal dialogs
│   └── ui/             # Radix-based UI primitives
├── context/            # React context providers
├── data/               # Content data (TypeScript objects)
│   ├── categoryContent.ts    # Expanded category page content (primary content file)
│   ├── categoryTaxonomy.ts   # Category hierarchy and taxonomy
│   ├── constructionData.ts   # Tool listings with affiliate links
│   ├── seoPages.ts           # SEO page definitions (comparisons, best-for)
│   ├── guidePages.ts         # Blog/guide article content
│   ├── toolDataset.ts        # Structured tool dataset
│   ├── faqData.ts            # FAQ entries
│   ├── comparisonData.ts     # Tool comparison data
│   ├── schemaData.ts         # JSON-LD schema markup
│   └── schemaTypes.ts        # Schema TypeScript types
├── pages/              # Page components (CategoryPage, etc.)
├── services/           # API/external service integrations
└── routes.ts           # React Router route definitions
content/                # Static content organized by trade
├── blog/
└── trades/             # Per-trade content (hvac, plumbing, electrical, etc.)
cron/                   # Cron job logs and configs
prompts/                # AI generation prompt templates
research/               # Per-trade research data
scripts/                # Build, generation, and automation scripts
```

## Content Workflows

### Adding a New Category Page

1. Define category in `app/data/categoryTaxonomy.ts`
2. Add expanded content to `app/data/categoryContent.ts`
3. Add tools to `app/data/toolDataset.ts`
4. Route is auto-generated via `app/routes.ts`
5. Schema markup in `app/data/schemaData.ts`

### Adding SEO Pages (Comparisons / Best-For)

1. Add page definition to `app/data/seoPages.ts`
2. Add related tool data to `app/data/constructionData.ts`
3. These two files frequently change together

### AI Content Generation (Local Ollama)

1. Use prompt template from `prompts/EXPANDED_TEMPLATE_GUIDE.md`
2. Run `scripts/generate-single-category.ts` for one category
3. Run `scripts/batch-local-generate.sh` for batch generation
4. Model: gemma4 via Ollama at `http://localhost:11434`
5. Uses OpenAI SDK (not Anthropic SDK) for Ollama compatibility
6. Responses may contain markdown code fences that need stripping

### Adding Blog/Guide Articles

1. Add article content to `app/data/guidePages.ts`
2. Target 1,500+ words for SEO optimization
3. Include real user feedback and detailed comparisons

## Commit Conventions

This project uses **descriptive commit messages** (not strict conventional commits):

- `Add ...` - New features, content, or tools (most common, ~50% of commits)
- `Fix ...` - Bug fixes, build fixes, deployment fixes
- `Update ...` - Modifications to existing content/config
- `Merge pull request #N` - PR merges from feature branches
- `Generate Batch N:` - AI-generated content batches
- `Expand ...` - Content expansion for existing pages
- Feature branches: `feature/<name>` pattern

~82% of commits follow Add/Fix/Update/Merge prefix patterns.

## File Co-Change Patterns

Files that frequently change together:

| File Group | Pattern |
|-----------|---------|
| `seoPages.ts` + `constructionData.ts` | Adding new SEO pages with tool data |
| `categoryContent.ts` + `categoryTaxonomy.ts` | New category pages |
| `package.json` + `package-lock.json` | Dependency updates |
| `cron/*.log` + `scripts/*.sh` | Automation updates |
| `vercel.json` | Deployment config iterations |

## Deployment Patterns

- **Platform**: Vercel (static hosting)
- **SPA Routing**: `public/_redirects` for SPA fallback
- **Vercel Config**: `vercel.json` - keep simple, avoid complex rewrites
- **Force Deploy**: Touch log files in `cron/` to trigger redeploy
- **Deployment Check**: `scripts/deployment-check.sh` verifies site + GA tracking

## Automation Scripts

| Script | Purpose |
|--------|---------|
| `health-check.sh` | Site health monitoring |
| `24-7-daemon.sh` | Auto-restart on failure |
| `x-poster.sh` | Twitter/X social posting |
| `serp-tracker*.cjs` | SERP position tracking |
| `daily-analytics.sh` | GA4 traffic reporting |
| `check-ai-rankings.sh` | AI search visibility |

## Testing

No test infrastructure detected. Test files should be added per the project's testing requirements.

## Key Data Files

The most frequently modified files are the data files in `app/data/`. These are large TypeScript objects containing all site content. When modifying:

- `categoryContent.ts` is the primary content file (~35 categories)
- Content follows the `EXPANDED_TEMPLATE_GUIDE.md` template
- Bilingual support (English + Spanish) per `TIER_1_CONTENT_GUIDE.md`
- Contractor-focused writing voice
