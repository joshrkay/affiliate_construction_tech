#!/bin/bash
# 24/7 Operations Manager
# Runs health checks every 15 minutes to ensure continuous operation

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/24-7-operation.log"

echo "🚀 Starting 24/7 Operations Manager at $(date)" >> "$LOG_FILE"

while true; do
    # Run health check
    bash "$SCRIPT_DIR/scripts/health-check.sh"
    
    # Sleep for 15 minutes (900 seconds)
    sleep 900
done
