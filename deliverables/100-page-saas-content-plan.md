# 100-Page Construction SaaS Content Plan

Date: 2026-03-07
Status: Execution plan (website-only focus)

## Objective
Build toward ~100 construction SaaS pages by trade, with:
- trade hub pages
- product summary pages (top SaaS per trade)
- comparison pages
- buyer guides/checklists

## Site Architecture (100-page target)

### A) Trade Hub Pages (16)
One hub page per trade:
1. General Contractor
2. Carpenter / Framer
3. Electrician
4. Plumber
5. HVAC Technician
6. Mason / Concrete
7. Roofer
8. Drywaller
9. Painter
10. Tile Setter
11. Flooring Installer
12. Welder / Metal Fabricator
13. Landscaper / Hardscaper
14. Glazier
15. Demolition Specialist
16. Finish Carpenter / Cabinet Installer

### B) SaaS Product Summary Pages (64)
4 product pages per trade x 16 trades = 64
- Format: “{Software} for {Trade}: Features, Pros, Cons, Pricing Notes”
- Include: best-for, pros/cons, alternatives, FAQ, trade-fit score

### C) Comparison Pages (12)
Core cross-trade SaaS comparisons:
1. ServiceTitan vs Housecall Pro
2. Buildertrend vs Procore
3. JobNimbus vs AccuLynx
4. Jobber vs FieldPulse
5. LMN vs Aspire
6. Contractor Foreman vs Buildertrend
7. FieldEdge vs ServiceTitan
8. CoConstruct vs Buildertrend
9. Knowify vs Contractor Foreman
10. Workiz vs Housecall Pro
11. Procore vs Autodesk Construction Cloud
12. Jobber vs Housecall Pro (service-heavy trades)

### D) Buyer Guides / Glossary / Checklists (8)
1. Construction SaaS buyer’s guide by trade
2. CRM vs FSM vs PM software for contractors
3. Pricing model guide (seat, revenue, dispatch-based)
4. Data migration checklist for contractors
5. Field app adoption checklist for crews
6. Reporting/KPI setup guide for trade businesses
7. Integrations guide (QuickBooks, payments, phones)
8. Change-management playbook for contractor teams

Total planned pages = 16 + 64 + 12 + 8 = **100**

---

## SaaS Product Shortlist by Trade (top candidates)

### General Contractor
- Procore
- Buildertrend
- Autodesk Construction Cloud
- Contractor Foreman

### Carpenter / Framer
- Buildertrend
- Jobber
- FieldPulse
- Service Fusion

### Electrician
- ServiceTitan
- Housecall Pro
- FieldPulse
- Workiz

### Plumber
- ServiceTitan
- Housecall Pro
- FieldEdge
- Workiz

### HVAC Technician
- ServiceTitan
- FieldEdge
- Housecall Pro
- Successware

### Mason / Concrete
- Procore
- Contractor Foreman
- Buildxact
- Knowify

### Roofer
- JobNimbus
- AccuLynx
- Roofr
- Leap

### Drywaller
- Buildertrend
- Contractor Foreman
- Knowify
- FieldPulse

### Painter
- Jobber
- Housecall Pro
- FieldPulse
- Service Fusion

### Tile Setter
- Buildertrend
- CoConstruct
- Jobber
- Contractor Foreman

### Flooring Installer
- Jobber
- Buildertrend
- FieldPulse
- Knowify

### Welder / Metal Fabricator
- Procore
- Autodesk Construction Cloud
- Contractor Foreman
- Knowify

### Landscaper / Hardscaper
- LMN
- Aspire
- Jobber
- SingleOps

### Glazier
- Knowify
- Buildertrend
- Contractor Foreman
- Procore

### Demolition Specialist
- Procore
- Contractor Foreman
- Buildertrend
- Knowify

### Finish Carpenter / Cabinet Installer
- Buildertrend
- CoConstruct
- Jobber
- Housecall Pro

---

## URL Pattern
- Trade hub: `/trades/{trade}/software`
- Product page: `/trades/{trade}/software/{software}`
- Comparison: `/compare/{a}-vs-{b}`
- Guide: `/guides/{topic}`

---

## Production Template (for every product summary page)
1. Who this software is best for
2. Key features for this trade
3. Pros (5–7 bullets)
4. Cons (3–5 bullets)
5. Pricing notes
6. Trade-fit score + rationale
7. Alternatives
8. FAQ
9. CTA (trade shortlist / demo resources)

---

## Execution Batches

### Batch 1 (first 20 pages)
- 5 trade hubs (GC, Electrician, Plumber, HVAC, Roofer)
- 12 product pages (3 each for those high-intent trades)
- 3 comparison pages

### Batch 2 (next 30 pages)
- Remaining 11 trade hubs
- 16 product pages
- 3 comparisons

### Batch 3 (next 25 pages)
- 25 additional product pages

### Batch 4 (final 25 pages)
- 11 remaining product pages
- 6 remaining comparisons
- 8 buyer guides/checklists

---

## Quality Gates
- One primary keyword per page
- Pros/cons must be concrete and non-generic
- Internal links: hub ↔ product ↔ comparison ↔ guides
- Schema where applicable (Article/FAQ)
- Publish only after QA + tracking checks
