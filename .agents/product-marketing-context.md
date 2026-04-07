# Product Marketing Context

## Product Overview

**Name**: BUILTECH  
**URL**: https://bestconstructionapps.com  
**Tagline**: The construction industry's AI & software directory  
**Type**: Affiliate software review site (B2B SaaS)  

## What We Do

BUILTECH is a programmatic SEO affiliate site that helps construction contractors find and compare software. We review 140+ construction software tools across 50+ categories and earn affiliate commissions when contractors click through and subscribe.

## Business Model

- **Revenue**: Affiliate commissions (20-30% recurring) from software vendors
- **Traffic source**: Organic SEO (programmatic pages + long-form content)
- **Conversion path**: Organic search → category page → comparison → affiliate click → vendor conversion
- **Key monetization tools**: Procore, Buildertrend, ServiceTitan, Jobber, HouseCall Pro (high-ticket SaaS)

## Target Audience

**Primary ICP**: Small-to-mid-size construction contractors
- General contractors (residential + commercial)
- HVAC, plumbing, electrical service companies
- Remodeling contractors
- Landscaping companies
- Restoration contractors

**Demographics**:
- Business owners/operators (not IT buyers)
- 2-50 employees
- Revenue: $500K–$10M/year
- Tech-savvy enough to search for software, not necessarily early adopters

**Pain points**:
- Overwhelmed by too many software options
- Not sure which tools are worth paying for
- Need proof from other contractors, not vendor marketing
- Often switching from spreadsheets or outdated systems

## Product (Site) Architecture

**Tech Stack**: Vite + React Router SPA, pre-rendered static HTML, Tailwind CSS  
**Routing patterns**:
- `/` — Homepage
- `/trades/:slug` — Trade-specific pages (HVAC, Plumbing, etc.)
- `/tools/:slug` — Individual tool review pages
- `/categories/:slug` — Category landing pages (NEW — Phase 1)
- `/compare/:slug` — Head-to-head tool comparisons
- `/best/:slug` — Best-for pages
- `/guides/:slug` — Long-form SEO guides
- `/search` — Search page

**Content types**:
- Trade pages (~15 trades)
- Tool reviews (~140 tools)
- Category pages (~50 categories — Phase 1 complete)
- Comparison pages (procore vs buildertrend, etc.)
- Best-for pages (best HVAC software, etc.)
- Guides (how to choose construction software, etc.)

## SEO Strategy

**Phase 1 (complete)**: Programmatic category pages
- 50 categories × comparison tables + FAQs + CTAs
- Target: "best [category] software for contractors"
- JSON-LD schemas: Article, ItemList, FAQPage, BreadcrumbList

**Phase 2 (in progress)**: Scale to 1,000+ pages
- Complete all 50 category pages with full content
- Add more comparison variants
- Add location-based pages

**Primary keyword targets**:
- "construction estimating software"
- "HVAC business management software"
- "construction accounting software"
- "[trade] software for contractors"
- "best construction project management software"

## Key Data

**Top affiliate opportunities** (high commission + high search volume):
1. Procore (~$8,500+/year SaaS, 25-30% affiliate)
2. ServiceTitan (~$200-400/month per tech, 20-25%)
3. Buildertrend (~$99-299/month, 20-30%)
4. Jobber (~$29-99/month, 25%)
5. QuickBooks (30% affiliate)

**Current content**: 
- 15 category pages fully written
- 140+ tool entries
- 15+ guides
- 20+ comparison pages

## Brand Voice

- Professional but approachable
- Contractor-first (not tech-first)
- Fact-based (real ratings, real reviews)
- ROI-focused ("save time, save money")
- No hype, no fluff

## Current Phase

**Phase 1 complete** (standalone SEO system built):
- Category taxonomy (50 categories)
- Tool dataset (40+ tools with affiliate metadata)
- Category page template
- Static generation extended
- 15 seed category pages written
- 8 content generation prompts created

**Phase 2** (James integration):
- Share with site owner (James) for integration
- Adapt to his existing architecture
- Scale to all 50 categories
- Deploy and measure
