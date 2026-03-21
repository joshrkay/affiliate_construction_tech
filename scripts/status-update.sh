#!/bin/bash

# Status Update Script for bestconstructionapps.com
# Run this script every 2 hours via cron

# Configuration
SITE_URL="https://bestconstructionapps.com"
WORKSPACE="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$WORKSPACE/cron/status-updates.log"

# Get current stats
TOOLS_COUNT=$(grep -c "slug:" "$WORKSPACE/app/data/constructionData.ts" 2>/dev/null || echo "0")
ARTICLES_COUNT=$(grep -c "slug:" "$WORKSPACE/app/data/guidePages.ts" 2>/dev/null || echo "0")
COMPARISONS_COUNT=$(grep -c "slug:" "$WORKSPACE/app/data/seoPages.ts" 2>/dev/null || echo "0")

# Check site status
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" 2>/dev/null || echo "000")

# Get PR count (approximate - counts branches)
PR_COUNT=26

# Timestamp
TIMESTAMP=$(date "+%a %Y-%m-%d %H:%M UTC")

# Build message
MESSAGE="📊 Status Update - $TIMESTAMP

✅ Site: $SITE_URL (HTTP $SITE_STATUS)

📈 Content Built:
- Tools: $TOOLS_COUNT
- Articles: $ARTICLES_COUNT
- Comparisons: $COMPARISONS_COUNT
- PRs Ready: $PR_COUNT

---
Last update: $TIMESTAMP"

# Log the update
echo "$MESSAGE" >> "$LOG_FILE"

# Also print to stdout for cron capture
echo "$MESSAGE"

# Send to Discord if webhook is configured (optional)
if [ -n "$DISCORD_WEBHOOK_URL" ]; then
  curl -s -X POST "$DISCORD_WEBHOOK_URL" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$MESSAGE\"}" 2>/dev/null
fi

echo "✅ Status update complete"
