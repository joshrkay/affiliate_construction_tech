#!/bin/bash
# 24/7 Operations Manager with Lead Generation
# Runs health checks every 15 minutes and lead generation periodically

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/24-7-operation.log"

echo "🚀 Starting 24/7 Operations Manager at $(date)" >> "$LOG_FILE"

COUNTER=0

while true; do
    # Run health check
    bash "$SCRIPT_DIR/scripts/health-check.sh"
    
    # Every hour (4th cycle), do lead generation research
    COUNTER=$((COUNTER + 1))
    
    if [ $COUNTER -eq 4 ]; then
        COUNTER=0
        echo "=== Lead Generation Cycle: $(date) ===" >> "$LOG_FILE"
        
        # Run lead generation
        bash "$SCRIPT_DIR/scripts/lead-outreach.sh" >> "$LOG_FILE" 2>&1
        
        echo "Lead research complete at $(date)" >> "$LOG_FILE"
    fi
    
    # Sleep for 15 minutes (900 seconds)
    sleep 900
done
