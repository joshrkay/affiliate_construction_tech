#!/bin/bash
# X/Twitter Automated Posting Script
# Posts to X every 6 hours with content summaries

SCRIPT_DIR="/root/.openclaw/workspace/affiliate_construction_tech"
LOG_FILE="$SCRIPT_DIR/cron/social-updates.log"
QUEUE_FILE="$SCRIPT_DIR/cron/post-queue.txt"

# Create queue file if it doesn't exist
touch "$QUEUE_FILE"

echo "🚀 Starting X/Twitter automated posting..." >> "$LOG_FILE"

POST_INDEX=0

while true; do
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
            # AI Construction Posts
            "🤖 AI in Construction: How artificial intelligence is revolutionizing the trades - from AI estimating to smart scheduling #ConstructionAI #Innovation #Tech"
            "🔮 The Future of Construction: AI, automation & technology trends shaping the industry in 2026 #ConstructionTech #FutureAI #Innovation"
            "🧠 AI Construction Software: How machine learning is transforming project management & estimating #ConstructionAI #Software #Tech"
            "📊 AI-Powered Takeoff: How AI is changing construction estimating - Togal.AI, STACK & more #ConstructionAI #Estimating #Tech"
            "⚙️ Automation in Construction: How contractors are using AI to save time & reduce errors #ConstructionAI #Automation #Productivity"
            "🎯 AI Project Management: How smart software is helping contractors stay on schedule & budget #ConstructionAI #PM #Management"
            "💡 Construction Tech Trends 2026: AI, drones, BIM & more #ConstructionTech #Innovation #Trends"
            # General Construction Posts
            "🚀 BUILTECH: 98 construction software tools reviewed! Find the best for your trade. #Construction #Contractors #BuildingTech"
            "🏗️ Best HVAC Software for Small Business (2026) - Jobber vs Housecall Pro vs ServiceTitan #HVAC #Software #FieldService"
            "🔧 Plumbing Software Review: Top 15 tools for plumbers in 2026 - Pricing, features & more #Plumbing #Construction #Software"
            "⚡ Electrical Contractors: What software do you use? We reviewed the top tools! #Electrical #Construction #Tech"
            "📊 Procore vs Buildertrend: Which is better for small contractors? Full comparison #Construction #ProjectManagement"
            "💰 How much does ServiceTitan cost? (2026 pricing breakdown) #FieldService #HVAC #Pricing"
            "🏠 General Contractors: Best construction management software for small business 2026 #GC #Construction #Management"
            "🔍 Jobber vs Housecall Pro: Which is right for your service business? #Contractors #Software #Comparison"
            "✅ Best construction software under \$50/month for small contractors #Construction #Budget #Affordable"
        )
        
        POST="${POSTS[$POST_INDEX]}"
        POST_INDEX=$(( (POST_INDEX + 1) % ${#POSTS[@]} ))
    fi
    
    # Post to X
    echo "Posting: $POST" >> "$LOG_FILE"
    xurl post "$POST" >> "$LOG_FILE" 2>&1
    
    # Log timestamp
    echo "Posted at: $(date)" >> "$LOG_FILE"
    echo "---" >> "$LOG_FILE"
    
    # Sleep for 6 hours (21600 seconds)
    echo "Next post in 6 hours..." >> "$LOG_FILE"
    sleep 21600
done
