#!/bin/bash
# X/Twitter Automated Posting Script
# Phase 1: Post frequently (every 6 hours) until 100 tweets
# Phase 2: Slow down to 3 posts/day once we have content caught up

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/social-updates.log"
QUEUE_FILE="$SCRIPT_DIR/cron/post-queue.txt"
COUNTER_FILE="$SCRIPT_DIR/cron/post-counter.txt"

# Create queue file if it doesn't exist
touch "$QUEUE_FILE"
touch "$COUNTER_FILE"

# Read current counter
POST_COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")

# Determine posting interval based on count
if [ "$POST_COUNT" -lt 100 ]; then
    # Phase 1: Post every 6 hours until 100 tweets
    POST_INTERVAL=21600
    echo "🚀 Phase 1: Posting every 6 hours (until 100 tweets)" >> "$LOG_FILE"
else
    # Phase 2: Slow down to 3 posts/day
    POST_INTERVAL=28800  # 8 hours
    echo "🚀 Phase 2: Slowing to 3 posts/day" >> "$LOG_FILE"
fi

echo "🚀 Starting X/Twitter automated posting... (Current: $POST_COUNT posts)" >> "$LOG_FILE"

POST_INDEX=0

while true; do
    # Read current count
    POST_COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
    
    # Check if we should change phase
    if [ "$POST_COUNT" -ge 100 ]; then
        POST_INTERVAL=28800  # 8 hours = 3 posts/day
        echo "📊 Reached 100 tweets - slowing to 3 posts/day" >> "$LOG_FILE"
    fi
    
    # Check if there's a custom post in the queue
    if [ -s "$QUEUE_FILE" ]; then
        # Read first line from queue
        POST=$(head -n 1 "$QUEUE_FILE")
        # Remove first line from queue
        sed -i '1d' "$QUEUE_FILE"
        echo "Custom post from queue: $POST" >> "$LOG_FILE"
    else
        # Default rotating posts with AI content
        POSTS=(
            # AI Construction Posts (7 posts)
            "🤖 AI in Construction: How artificial intelligence is revolutionizing the trades - from AI estimating to smart scheduling #ConstructionAI #Innovation #Tech"
            "🔮 The Future of Construction: AI, automation & technology trends shaping the industry in 2026 #ConstructionTech #FutureAI #Innovation"
            "🧠 AI Construction Software: How machine learning is transforming project management & estimating #ConstructionAI #Software #Tech"
            "📊 AI-Powered Takeoff: How AI is changing construction estimating - Togal.AI, STACK & more #ConstructionAI #Estimating #Tech"
            "⚙️ Automation in Construction: How contractors are using AI to save time & reduce errors #ConstructionAI #Automation #Productivity"
            "🎯 AI Project Management: How smart software is helping contractors stay on schedule & budget #ConstructionAI #PM #Management"
            "💡 Construction Tech Trends 2026: AI, drones, BIM & more #ConstructionTech #Innovation #Trends"
            # Software Posts
            "🚀 BUILTECH: 98 construction software tools reviewed! Find the best for your trade. #Construction #Contractors #BuildingTech"
            "🏗️ Best HVAC Software for Small Business (2026) - Jobber vs Housecall Pro vs ServiceTitan #HVAC #Software #FieldService"
            "🔧 Plumbing Software Review: Top 15 tools for plumbers in 2026 - Pricing, features & more #Plumbing #Construction #Software"
            "⚡ Electrical Contractors: What software do you use? We reviewed the top tools! #Electrical #Construction #Tech"
            "📊 Procore vs Buildertrend: Which is better for small contractors? Full comparison #Construction #ProjectManagement"
            "💰 How much does ServiceTitan cost? (2026 pricing breakdown) #FieldService #HVAC #Pricing"
            "🏠 General Contractors: Best construction management software for small business 2026 #GC #Construction #Management"
            "🔍 Jobber vs Housecall Pro: Which is right for your service business? #Contractors #Software #Comparison"
            "✅ Best construction software under \$50/month for small contractors #Construction #Budget #Affordable"
            "📖 New Article: How to Choose Construction Software in 2026 - Complete guide #Construction #Software #Guide"
            "🏗️ BUILTECH Vision: We're the go-to for ALL construction technology! #ConstructionTech #Building"
        )
        
        POST="${POSTS[$POST_INDEX]}"
        POST_INDEX=$(( (POST_INDEX + 1) % ${#POSTS[@]} ))
    fi
    
    # Post to X
    echo "Posting: $POST" >> "$LOG_FILE"
    RESULT=$(xurl post "$POST" 2>&1)
    echo "$RESULT" >> "$LOG_FILE"
    
    # Increment counter
    if echo "$RESULT" | grep -q "id"; then
        NEW_COUNT=$((POST_COUNT + 1))
        echo "$NEW_COUNT" > "$COUNTER_FILE"
        echo "✅ Post #$NEW_COUNT successful" >> "$LOG_FILE"
    fi
    
    # Log timestamp
    echo "Posted at: $(date)" >> "$LOG_FILE"
    echo "---" >> "$LOG_FILE"
    
    # Sleep for the determined interval
    echo "Next post in $((POST_INTERVAL/3600)) hours..." >> "$LOG_FILE"
    sleep $POST_INTERVAL
done
