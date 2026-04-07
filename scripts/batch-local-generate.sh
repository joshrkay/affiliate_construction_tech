#!/bin/bash
# Batch generate categories using local Ollama
# Run this on your local machine (not server)
#
# Prerequisites:
#   - Ollama running locally (http://localhost:11434)
#   - Node.js/npm installed
#
# Usage:
#   bash scripts/batch-local-generate.sh batch2 gemma4

BATCH=$1
MODEL=${2:-gemma4}
LANGUAGE=${3:-en}

if [ -z "$BATCH" ]; then
  echo "Usage: bash scripts/batch-local-generate.sh <batch> [model] [language]"
  echo "Examples:"
  echo "  bash scripts/batch-local-generate.sh batch2          # English, gemma4"
  echo "  bash scripts/batch-local-generate.sh batch2 llama3.1 # English, llama3.1"
  echo "  bash scripts/batch-local-generate.sh batch2 gemma4 es # Spanish, gemma4"
  exit 1
fi

echo "🚀 Starting batch generation"
echo "Batch: $BATCH"
echo "Model: $MODEL"
echo "Language: $LANGUAGE"
echo "Ollama URL: http://localhost:11434"
echo ""

# Define categories per batch
case $BATCH in
  batch2)
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
    ;;
  batch3)
    CATEGORIES=(
      "customer-management"
      "lead-management"
      "proposal-generation"
      "contract-management"
      "punch-list-management"
      "project-closeout"
      "material-ordering"
      "supplier-management"
      "equipment-rental"
      "tool-inventory"
    )
    ;;
  batch4)
    CATEGORIES=(
      "subcontractor-management"
      "crew-communication"
      "site-access-control"
      "visitor-tracking"
      "attendance-tracking"
      "analytics-reporting"
      "profitability-analysis"
      "cash-flow-management"
      "accounts-payable"
    )
    ;;
  *)
    echo "Unknown batch: $BATCH"
    exit 1
    ;;
esac

echo "Categories to generate (${#CATEGORIES[@]} total):"
for cat in "${CATEGORIES[@]}"; do
  echo "  - $cat"
done
echo ""

# Generate each category
SUCCESS=0
FAILED=0

for CATEGORY in "${CATEGORIES[@]}"; do
  echo "📝 Generating $LANGUAGE/$CATEGORY..."

  npx tsx scripts/generate-single-category.ts \
    --category="$CATEGORY" \
    --language="$LANGUAGE" \
    --model="$MODEL" \
    --ollama-url="http://localhost:11434" \
    >> results/generation-$BATCH-$LANGUAGE.log 2>&1

  if [ $? -eq 0 ]; then
    echo "✅ $CATEGORY"
    ((SUCCESS++))
  else
    echo "❌ $CATEGORY (see results/generation-$BATCH-$LANGUAGE.log)"
    ((FAILED++))
  fi
done

echo ""
echo "╔════════════════════════════════════════╗"
echo "║ Batch Generation Complete             ║"
echo "╠════════════════════════════════════════╣"
echo "║ ✅ Success:  $SUCCESS"
echo "║ ❌ Failed:   $FAILED"
echo "║ 📊 Total:   $((SUCCESS + FAILED))"
echo "╚════════════════════════════════════════╝"

if [ $FAILED -eq 0 ]; then
  echo ""
  echo "🎉 All categories generated successfully!"
  echo ""
  echo "Next steps:"
  echo "1. npm run build   # Build and pre-render"
  echo "2. git add app/data/categoryContent.ts"
  echo "3. git commit -m 'Add $BATCH categories'"
  echo "4. git push"
else
  echo ""
  echo "⚠️  Some categories failed. Review the log:"
  echo "cat results/generation-$BATCH-$LANGUAGE.log"
fi
