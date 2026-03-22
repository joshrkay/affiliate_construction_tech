#!/bin/bash
# Daily Analytics Check
# Runs daily to track engagement and performance

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/analytics.log"

echo "=== Analytics Check: $(date) ===" >> "$LOG_FILE"

# Run analytics
cd "$SCRIPT_DIR"
node scripts/get-analytics.cjs >> "$LOG_FILE" 2>&1

echo "" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
