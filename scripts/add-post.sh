#!/bin/bash
# Add custom post to X queue
# Usage: ./add-post.sh "Your post content here #hashtags"

QUEUE_FILE="/root/.openclaw/workspace/affiliate_construction_tech/cron/post-queue.txt"
LOG_FILE="/root/.openclaw/workspace/affiliate_construction_tech/cron/social-updates.log"

if [ -z "$1" ]; then
    echo "Usage: ./add-post.sh \"Your post with #hashtags\""
    exit 1
fi

# Add post to queue
echo "$1" >> "$QUEUE_FILE"

echo "✅ Added to post queue: $1"
echo "Queue now has $(wc -l < "$QUEUE_FILE") posts"

# Log it
echo "Queued custom post: $1" >> "$LOG_FILE"
