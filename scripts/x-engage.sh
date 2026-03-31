#!/bin/bash
# X/Twitter Engagement Script
# Find and interact with construction tech content

echo "🔍 Searching for construction tech content..."

# Search queries for construction tech
QUERIES=(
  "construction software"
  "HVAC software"
  "plumbing business"
  "contractor tools"
  "construction technology"
  "field service software"
  "project management construction"
)

# Target accounts to follow
TARGET_ACCOUNTS=(
  "ConstructionDive"
  "ENRmagazine"
  "Procore"
  "Buildertrend"
  "Jobber"
  "ServiceTitan"
  "HousecallPro"
  "constructionnews"
  "BuildTools"
  "ContractorCom"
)

# Function to like posts
like_posts() {
  echo "❤️ Liking posts about: $1"
  xurl search "$1" -n 10 --mine | jq -r '.data[] | .id' | while read id; do
    xurl like "$id" 2>/dev/null
    echo "  Liked: $id"
  done
}

# Function to follow users
follow_users() {
  echo "👥 Following target accounts..."
  for handle in "${TARGET_ACCOUNTS[@]}"; do
    xurl follow "$handle" 2>/dev/null && echo "  Followed: @$handle"
    sleep 2
  done
}

# Function to post engagement content
post_engagement() {
  echo "📝 Posting engagement content..."
  
  # Question posts
  xurl post "What's the #1 software challenge for your construction business? Reply below! 👇 #Construction #HVAC #Plumbing #Contractors"
  sleep 60
  
  xurl post "Poll: What's your biggest time-waster in the field? 🏗️🔨⚡ #ConstructionTech #FieldService"
  sleep 60
  
  # Value posts
  xurl post "Pro tip: The best software is the one your team actually uses. User adoption > Features. #Construction #SaaS #Contractors"
  sleep 60
  
  xurl post "Just discovered an amazing tool for HVAC contractors! More details coming soon... 🔥 #HVAC #ConstructionTech"
  sleep 60
}

# Main execution
echo "🚀 Starting X engagement campaign..."

# 1. Follow target accounts
follow_users

# 2. Like and engage with content
for query in "${QUERIES[@]}"; do
  like_posts "$query"
  sleep 30
done

# 3. Post engagement content
post_engagement

echo "✅ Engagement campaign complete!"
