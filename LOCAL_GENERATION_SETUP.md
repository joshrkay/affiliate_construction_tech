# Local Batch Generation Setup (Ollama + gemma4)

Your Mac is ready with Ollama + gemma4. This guide shows how to batch-generate 30 remaining categories + 35 Spanish translations locally.

## Quick Start

### 1. Verify Ollama is Running

```bash
curl http://localhost:11434/api/tags | jq '.models[0].name'
# Output: "gemma4:latest"
```

### 2. Clone Repo Locally (if not already)

```bash
cd /path/to/affiliate_construction_tech
```

### 3. Generate Batch 2 (10 categories, English)

```bash
# Single category test first
npx tsx scripts/generate-single-category.ts \
  --category=financial-management \
  --language=en \
  --model=gemma4 \
  --ollama-url=http://localhost:11434/v1

# This will output TypeScript object to console
# You'll copy the JSON output and add to app/data/categoryContent.ts
```

**Expected output:**
- Takes ~2-5 minutes per category (gemma4 is slower but good quality)
- Outputs complete category object as JSON
- Ready to paste into `categoryContent.ts`

### 4. Batch All 10 Categories (Batch 2)

Create a simple loop to generate all 10:

```bash
# Batch 2 categories
CATEGORIES=(
  "financial-management"
  "job-costing"
  "payroll-management"
  "time-tracking"
  "change-order-management"
  "rfi-management"
  "safety-compliance"
  "warranty-management"
  "compliance-documentation"
  "customer-reviews"
)

for CAT in "${CATEGORIES[@]}"; do
  echo "Generating $CAT..."
  npx tsx scripts/generate-single-category.ts \
    --category="$CAT" \
    --language=en \
    --model=gemma4 \
    --ollama-url=http://localhost:11434/v1 \
    > output/$CAT-en.json
done
```

### 5. Integrate Results Back to Server

Once you have all JSON outputs:

```bash
# 1. Copy the JSON files to server
scp output/*.json user@server:/tmp/categories/

# 2. On server: merge all JSONs into categoryContent.ts
npm run build  # Validates and pre-renders all pages
git add app/data/categoryContent.ts
git commit -m "Add Batch 2: 10 categories from local Ollama generation"
git push
```

## Workflow Summary

### English Batches (30 categories, ~2-3 hours each)

**Batch 2: Financial/Operations** (10 categories)
```
financial-management, job-costing, payroll, time-tracking, 
change-orders, RFI, safety, warranty, compliance, reviews
```

**Batch 3: Sales/Proposals** (10 categories)
```
customer-management, lead-management, proposals, contracts,
punch-lists, closeout, materials, suppliers, equipment-rental, tool-inventory
```

**Batch 4: Management** (9 categories)
```
subcontractor-management, crew-communication, site-access, 
visitor-tracking, attendance, analytics, profitability, cash-flow, accounts-payable
```

**Total English:** ~3 hours × 3 batches = 9 hours

### Spanish Translations (35 categories, ~2-3 hours total)

Once English is done:

```bash
# Generate Spanish for ALL 35 categories
for CAT in $(cat config/all-35-categories.txt); do
  npx tsx scripts/generate-single-category.ts \
    --category="$CAT" \
    --language=es \
    --model=gemma4 \
    --ollama-url=http://localhost:11434/v1 \
    > output/$CAT-es.json
done
```

**Total Spanish:** ~2-3 hours

## Performance Notes

- **gemma4**: ~2-5 min/category (good quality, good speed balance)
- **llama3.1**: ~1-3 min/category (slightly faster, similar quality)
- **Total time estimate**: 
  - Batch 2: 20-50 minutes (10 cats × 2-5 min)
  - Batch 3: 20-50 minutes
  - Batch 4: 18-45 minutes
  - Spanish: 70-175 minutes (35 cats)
  - **Total: ~2-6 hours** (can run overnight or in parallel)

## Cost Savings

- **API approach**: $200-500 for 65 categories (35 EN + 35 ES) at ~$5 per category
- **Local approach**: $0 (just your computer's compute)

## Troubleshooting

### Ollama connection fails
```bash
# Make sure Ollama is running
brew services list | grep ollama

# Start if not running
ollama serve
```

### gemma4 is too slow
Switch to llama3.1 (faster):
```bash
--model=llama3.1
```

### Output quality is poor
Try:
1. Increase context: change `temperature: 0.7` to `0.6` (more deterministic)
2. Switch to gemma4 if using llama3.1 (better instruction following)
3. Refine prompts in `generate-single-category.ts`

## File Structure

```
affiliate_construction_tech/
├── scripts/
│   ├── generate-single-category.ts     # Main generator (run on Mac)
│   └── batch-local-generate.sh         # Helper for batching
├── app/data/
│   └── categoryContent.ts              # Append results here
└── LOCAL_GENERATION_SETUP.md           # This file
```

## Next Steps

1. ✅ Test single category (financial-management)
2. ✅ Review output quality
3. ✅ Batch generate Batch 2 (10 categories)
4. ✅ Push results to server
5. ✅ Repeat for Batch 3, Batch 4
6. ✅ Generate Spanish versions
7. ✅ Final build and deploy

---

**Ready to start?** Run:

```bash
npx tsx scripts/generate-single-category.ts \
  --category=financial-management \
  --language=en \
  --model=gemma4 \
  --ollama-url=http://localhost:11434/v1
```

It'll take ~2-5 min. When done, you'll see the category JSON object. Copy it and add to `app/data/categoryContent.ts`.
