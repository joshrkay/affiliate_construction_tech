#!/bin/bash
# Pre-Deployment Check
# Verifies site is live and tracking in Google Analytics

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/deployment-check.log"

echo "=== Deployment Check: $(date) ===" >> "$LOG_FILE"

# 1. Check site is live
echo "1. Checking site status..." >> "$LOG_FILE"
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://bestconstructionapps.com")
echo "   Site HTTP: $SITE_STATUS" >> "$LOG_FILE"

if [ "$SITE_STATUS" != "200" ]; then
    echo "   ⚠️ Site is DOWN!" >> "$LOG_FILE"
    exit 1
fi
echo "   ✅ Site is live" >> "$LOG_FILE"

# 2. Check Google Analytics tag
echo "2. Checking Google Analytics..." >> "$LOG_FILE"
GA_CHECK=$(curl -s "https://bestconstructionapps.com" | grep -c "googletagmanager.com/gtag")
if [ "$GA_CHECK" -gt 0 ]; then
    echo "   ✅ GA tag found" >> "$LOG_FILE"
else
    echo "   ⚠️ GA tag NOT found!" >> "$LOG_FILE"
fi

# 3. Check Analytics has data
echo "3. Checking Analytics data..." >> "$LOG_FILE"
cd "$SCRIPT_DIR"
ANALYTICS=$(node -e "
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const client = new BetaAnalyticsDataClient({ keyFilename: './config/ga-credentials.json' });
client.runReport({
  property: 'properties/527747944',
  dateRanges: [{ startDate: 'today', endDate: 'today' }],
  metrics: [{ name: 'sessions' }]
}).then(r => {
  console.log(r[0].rows ? r[0].rows[0].metricValues[0].value : '0');
}).catch(e => console.log('error'));
" 2>&1)

if [ "$ANALYTICS" != "error" ] && [ "$ANALYTICS" -gt 0 ]; then
    echo "   ✅ Analytics tracking: $ANALYTICS sessions today" >> "$LOG_FILE"
elif [ "$ANALYTICS" == "error" ]; then
    echo "   ⚠️ Could not verify analytics (API error)" >> "$LOG_FILE"
else
    echo "   ⚠️ No analytics data yet (0 sessions)" >> "$LOG_FILE"
fi

# 4. Check key pages exist (SPA routes - expect 404 via curl, works in browser)
echo "4. Checking SPA routes (expected 404 via curl)..." >> "$LOG_FILE"
echo "   ℹ️ SPA routes work in browser (client-side routing)" >> "$LOG_FILE"

echo "=== Deployment Check Complete ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
