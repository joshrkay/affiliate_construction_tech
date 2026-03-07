# 02 — Tool Dataset Structure Across 16 Trades

Status: Initial schema draft (local)
Date: 2026-03-06

## Objective
Define a normalized dataset model that supports:
- SEO pages
- Filterable tool guides
- Trade-specific recommendations
- AI-friendly structured summaries

## 16 Trade Coverage (V1)
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

## Core Entities
- `trade`
- `tool_category`
- `tool_model`
- `use_case`
- `material`
- `safety_requirement`
- `maintenance_task`
- `content_asset`

## Suggested Table Schema

### `tools`
- tool_id (PK)
- brand
- model
- category
- power_source
- weight_lb
- key_specs_json
- price_band
- pros
- cons
- updated_at

### `trade_tool_fit`
- fit_id (PK)
- trade_id
- tool_id
- use_case
- fit_score (1-10)
- skill_level (beginner/intermediate/pro)
- notes

### `keyword_targets`
- keyword_id (PK)
- keyword
- intent_type
- cluster
- priority
- ai_answerability
- mapped_url_slug

### `content_map`
- content_id (PK)
- format (guide/comparison/faq/checklist)
- primary_keyword
- secondary_keywords_json
- target_trade
- cta_type
- schema_type

## URL/Content Pattern Recommendation
- `/tools/{category}/{model}`
- `/trades/{trade}/best-{tool-category}`
- `/compare/{tool-a}-vs-{tool-b}`
- `/guides/{topic}`

## QA Requirements
- One canonical category per tool model
- One primary keyword per page
- No duplicate slug collisions
- Structured data validation on publish
