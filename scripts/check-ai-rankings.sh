#!/bin/bash
# AI Search Rankings Check Script
# Run this to check how BUILTECH appears in AI search results

echo "=== BUILTECH AI Search Rankings Check ==="
echo "Date: $(date)"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if site is indexed
echo -e "${YELLOW}1. Checking if site is indexed...${NC}"
echo "Run this in Google Search Console manually:"
echo "https://search.google.com/search-console?resource_id=sc-domain:bestconstructionapps.com"
echo ""

# Check for featured snippets
echo -e "${YELLOW}2. Checking featured snippets (manual)...${NC}"
echo "Search these queries in Google:"
echo "- Procore vs Buildertrend"
echo "- How much does ServiceTitan cost?"
echo "- Best HVAC software for small business"
echo ""

# Check Bing (for Bing Chat)
echo -e "${YELLOW}3. Checking Bing Webmaster Tools...${NC}"
echo "Go to: https://www.bing.com/webmasters"
echo "Add site and check AI Chat impressions"
echo ""

# Check Perplexity (manual)
echo -e "${YELLOW}4. Checking Perplexity citations...${NC}"
echo "Search for your tool names on Perplexity:"
echo "perplexity.ai/search/procore-review"
echo ""

# Track specific keywords
echo -e "${YELLOW}5. Tracking keyword rankings...${NC}"

# Define keywords to track
KEYWORDS=(
  "best construction software"
  "procore vs buildertrend"
  "servicetitan vs jobber"
  "how much does procore cost"
  "best hvac software small business"
)

echo "Monitor these keywords in Google Search Console:"
for keyword in "${KEYWORDS[@]}"; do
  echo "  - $keyword"
done
echo ""

# AI Overview appearances
echo -e "${YELLOW}6. AI Overview Checklist${NC}"
echo "To appear in Google AI Overviews:"
echo "  [ ] Have content that directly answers questions"
echo "  [ ] Use FAQ schema on question pages"
echo "  [ ] Get backlinks from authoritative sites"
echo "  [ ] Have E-E-A-T signals (experience, expertise)"
echo "  [ ] Update content regularly"
echo ""

# Check schema markup
echo -e "${YELLOW}7. Schema Markup Status${NC}"
echo "Verify schema is working:"
echo "1. Go to: https://search.google.com/test/rich-results"
echo "2. Enter URL: https://bestconstructionapps.com"
echo "3. Check for FAQ, Review, Article schemas"
echo ""

# Success metrics
echo -e "${GREEN}=== Success Metrics ===${NC}"
echo "| Metric | 30 Days | 90 Days |"
echo "|--------|---------|----------|"
echo "| AI Overview appearances | 10 | 50 |"
echo "| Featured snippets | 5 | 20 |"
echo "| Clicks from AI | 50 | 200 |"
echo ""

echo "=== Check Complete ==="
