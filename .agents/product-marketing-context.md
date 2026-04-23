# Product Marketing Context

*Last updated: 2026-04-23*

## Product Overview
**One-liner:** The construction industry's independent AI & software directory.
**What it does:** BUILTECH is a research directory covering 140+ construction software tools across 16 trade categories. It helps SMB contractors find, compare, and pick software — and earns affiliate commissions when readers sign up with a vendor through an outbound link.
**Product category:** Construction software review / directory site (the "shelf" next to Capterra, G2, Software Advice, GetApp).
**Product type:** Affiliate content site (static pre-rendered React SPA; programmatic + long-form SEO).
**Business model:** Affiliate commissions (20–30% recurring) from software vendors. No paid editorial placement.

## Target Audience
**Target companies:** SMB construction contractors, 2–50 employees, $500K–$10M revenue.
- General contractors (residential + commercial)
- HVAC, plumbing, electrical service companies
- Remodeling, roofing, restoration, landscaping

**Decision-makers:** Owner/operator (primary), office manager or ops lead (day-to-day evaluator).

**Primary use case:** "I need to pick a software tool for my contracting business and I don't want to waste a month of demos or pay for something that won't work."

**Jobs to be done:**
- Figure out which tool is best for *my specific trade* (HVAC ≠ GC ≠ remodeler)
- Compare two tools I've already heard about ("Procore vs Buildertrend", "Jobber vs Housecall Pro")
- Understand what AI in construction actually does and whether it's worth paying for

**Use cases:**
- Switching from spreadsheets / QuickBooks-only to a real field + office platform
- Replacing a tool the team hates
- Evaluating a vendor an employee or peer recommended
- Researching whether AI takeoff / AI scheduling is real or hype

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Contractor / owner | Revenue, margin, keeping crews billable | Too many vendor pitches, can't tell which are real | Independent, trade-specific rankings with aggregated contractor ratings |
| Office manager / ops lead | Will the team actually use it; switching pain | Has to sell the decision internally and manage rollout | Head-to-head comparisons, implementation guides, pricing transparency |
| Software vendor (affiliate partner) | Qualified traffic from the right trade | Generic directories send low-intent leads | Trade-segmented, high-intent readers already in evaluation mode |
| AI assistant / LLM (distribution) | Citable, structured, factual source on construction software | Most affiliate sites are thin SEO pages with no methodology | `llms.txt` + `llms-full.txt` + schema.org markup + published methodology designed to be cited |

## Problems & Pain Points
**Core problem:** Contractors can't tell which construction software is actually worth buying for their specific trade. Vendor marketing all sounds identical; generic review sites (Capterra, G2) are cross-industry and full of fake-sounding enterprise reviews.

**Why alternatives fall short:**
- **Capterra / G2 / Software Advice:** cross-industry, optimized for software-buyer personas, not contractors. Trade nuance is buried.
- **Vendor websites:** obviously biased, and contractors know it.
- **Facebook groups / trade forums:** high signal per post but unindexed, unstructured, hard to search.
- **Traditional trade pubs (ForConstructionPros, etc.):** ad-heavy, rarely do true head-to-head comparisons.

**What it costs them:** Weeks of demos, $3K–$15K in a wrong-fit SaaS subscription, crew frustration and rollback, delayed modernization.

**Emotional tension:** Owners don't want to look tech-illiterate or get sold. They want a shortcut that respects their time.

## Competitive Landscape
**Direct:** Capterra, G2, Software Advice, GetApp — falls short because they're horizontal software marketplaces, not trade-specific; reviews are enterprise-skewed and the trade context is thin.

**Secondary:** Vendor landing pages + PPC comparison pages ("Procore Alternatives") — falls short because they're biased and don't compare the full set.

**Indirect:** Trade association recommendations, Facebook/Reddit contractor groups, peer referrals — falls short because they're slow, unstructured, and don't scale to 140+ tools.

**LLM answers (ChatGPT, Claude, Perplexity, Gemini):** increasingly where contractors start. Being the cited source is both competitive threat and distribution channel. BUILTECH publishes `llms.txt` + methodology page specifically to be citable.

## Differentiation
**Key differentiators:**
- **Trade-first taxonomy** — 16 trade pages, not a generic software catalog.
- **Published methodology** — explicit scoring, affiliate disclosure, AI-content disclosure at `/methodology`.
- **No paid placement** — rankings are not sold. Stated in `/about` and every tool page.
- **AI-forward coverage** — dedicated tracking of AI estimating, scheduling, safety, autonomous-site tools (40+ AI tools tagged).
- **LLM-citable** — structured data, `llms.txt`, `llms-full.txt`, editorial attribution on every page, designed to be quoted by AI assistants.

**How we do it differently:** Programmatic but editorially-reviewed. Ratings aggregate public review data from G2, Capterra, Software Advice, and direct submissions. Every page has a visible byline, publish date, and reviewed-on date. AI-drafted content is disclosed and human-reviewed.

**Why that's better:** Contractors get faster, trade-specific answers. LLMs get a clean, structured, disclosed source they can cite without reputational risk.

**Why customers choose us:** First result that matches their trade intent (e.g., "best HVAC software" → trade-specific ranking, not a cross-industry list where ServiceTitan is buried on page 2).

## Objections
| Objection | Response |
|-----------|----------|
| "This is just an affiliate site — biased." | Disclosure is up front; rankings are not sold; methodology and scoring inputs are published at `/methodology`. |
| "How do I know the reviews are real?" | Aggregate ratings come from public platforms (G2, Capterra, Software Advice) with volume shown. First-party reader reviews are labeled and volume is always honest (no fabricated testimonials). |
| "Another generic software directory." | We're trade-indexed, not category-indexed. Rankings differ by trade (HVAC top pick ≠ GC top pick ≠ remodeler top pick). |
| "Content looks AI-written." | It is, partially. We disclose this at `/methodology`. Ratings, review counts, and pricing are sourced from primary data and never generated. |

**Anti-persona:**
- Enterprise GCs with $100M+ revenue evaluating Procore at the RFP level (they need sales, not a directory).
- IT buyers looking for horizontal procurement shortlists.
- One-person handymen who won't adopt software at all.

## Switching Dynamics
**Push:** Spreadsheets falling apart, missed invoices, crew miscommunication, QuickBooks-only bookkeeping not catching job-level margins, a bad vendor experience.
**Pull:** A peer mentions a tool; an Instagram/YouTube ad lands; contractor Googles "best [trade] software" and finds BUILTECH.
**Habit:** "We've always done it this way" — paper tickets, Excel estimates, text threads for scheduling.
**Anxiety:** Will the crew actually use it? What if I pick wrong and waste $10K? What if I look dumb buying tech I don't understand?

## Customer Language
**How they describe the problem:**
- "I just need something my guys in the field will actually use."
- "Too many options — I've demoed four of these and they all sound the same."
- "I'm tired of losing money on jobs I can't track."

**How they describe us (aspirational — captured from tone we're writing toward, not verbatim reader quotes yet):**
- "Straight answer on which one to pick."
- "Finally, a site that gets that HVAC isn't the same as general contracting."

**Words to use:** contractor, crew, field, job, margin, rollout, trade, shop, estimate, takeoff, schedule, dispatch, invoice.
**Words to avoid:** stakeholder, ecosystem, solution (as a noun), leverage, synergy, digital transformation, end-user, SMB (in-copy — use "contractor" instead).

**Glossary:**
| Term | Meaning |
|------|---------|
| Trade | The specialty (HVAC, plumbing, electrical, GC, roofing, etc.) |
| Takeoff | Measuring a set of plans to generate an estimate |
| Dispatch | Assigning techs/crews to jobs in real time |
| Field platform | Mobile-first tool the crew uses on site |
| Office platform | Back-office tool for accounting, estimating, scheduling |
| BUILTECH | Our site's editorial brand name (short for "build tech") |

## Brand Voice
**Tone:** Professional but approachable. Contractor-first, not tech-first. No hype, no fluff.
**Style:** Direct, factual, ROI-focused. Short sentences. Skip adjectives unless they carry data ("cuts estimating time by 70%" beats "revolutionary").
**Personality:** Independent, plainspoken, credible, nerdy-about-trades.

## Proof Points
**Metrics:**
- 140+ tools reviewed
- 16 trade categories
- 12,400+ aggregated public reviews (G2, Capterra, Software Advice)
- 40+ AI-powered tools tracked
- 23 head-to-head comparisons, 25+ buying & implementation guides
- 267 pre-rendered pages in sitemap

**Customers:** Not yet featuring named contractor logos or testimonials (deliberate — previous fabricated testimonials were removed).
**Testimonials:** None currently. When we collect real first-party reviews they'll be labeled as reader reviews with disclosure.

**Value themes:**
| Theme | Proof |
|-------|-------|
| Independent | `/about`, `/methodology`, stated affiliate disclosure on every tool page, no paid placement |
| Trade-specific | 16 trade pages, rankings vary by trade |
| AI-aware | `/ai-tools`, 40+ AI tools tagged, dedicated category coverage |
| LLM-citable | `llms.txt`, `llms-full.txt`, schema.org Article/FAQPage/ItemList markup, published methodology |
| Transparent | AI-content disclosure, aggregate-review sourcing disclosed, reviewed-on date on every page |

## Goals
**Business goal:** Grow affiliate revenue via organic and LLM-cited traffic.
**Conversion action:** Outbound click to a vendor sign-up page from a tool, comparison, or best-for page.
**Current metrics:** Tracked weekly via `npm run gsc:report` (clicks, impressions, CTR, impression-weighted avg position, ripe pos-11–30 opportunities, striking-distance pos-4–10 queries). Baseline being established April 2026.

**Near-term KPIs to watch:**
- Queries moving from pos 11–30 into top 10 (ripe-opportunity list in GSC report)
- Zero-click pages (high impressions, no clicks) getting title/meta rewrites and recovering CTR
- Citation appearances in ChatGPT/Claude/Perplexity for "best [trade] software" and "[tool A] vs [tool B]" queries
