#!/bin/bash
# Health check and auto-restart for 24/7 operation

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/health-check.log"

echo "=== Health Check: $(date) ===" >> "$LOG_FILE"

# Check if status-daemon is running
if ! pgrep -f "status-daemon.sh" > /dev/null; then
    echo "⚠️ Status daemon not running - restarting..." >> "$LOG_FILE"
    bash "$SCRIPT_DIR/scripts/status-daemon.sh" >> "$SCRIPT_DIR/cron/status-updates.log" 2>&1 &
    echo "✅ Status daemon restarted" >> "$LOG_FILE"
else
    echo "✅ Status daemon running" >> "$LOG_FILE"
fi

# Check if x-poster is running
if ! pgrep -f "x-poster.sh" > /dev/null; then
    echo "⚠️ X-poster not running - restarting..." >> "$LOG_FILE"
    bash "$SCRIPT_DIR/scripts/x-poster.sh" >> "$SCRIPT_DIR/cron/social-updates.log" 2>&1 &
    echo "✅ X-poster restarted" >> "$LOG_FILE"
else
    echo "✅ X-poster running" >> "$LOG_FILE"
fi

# Check site status
SITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://bestconstructionapps.com" 2>/dev/null || echo "000")
echo "🌐 Site status: $SITE_STATUS" >> "$LOG_FILE"

echo "---" >> "$LOG_FILE"
