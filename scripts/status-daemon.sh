#!/bin/bash
# Alternative to cron - simple loop that runs every 2 hours

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech/scripts"
LOG_FILE="/root/.openclaw/workspace/affiliate_construction_tech/cron/status-updates.log"

echo "Starting status update daemon..."

while true; do
    # Run the status update script
    bash "$SCRIPT_DIR/status-update.sh" >> "$LOG_FILE" 2>&1
    
    # Sleep for 2 hours (7200 seconds)
    echo "Next update in 2 hours..." >> "$LOG_FILE"
    sleep 7200
done
