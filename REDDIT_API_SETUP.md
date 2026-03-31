# Reddit API Automation Setup

## Overview

Reddit uses OAuth2 for API access. Here's how to set up automated posting.

---

## Step 1: Create Reddit App

1. Go to: https://www.reddit.com/prefs/apps
2. Click **"are you a developer? create an app..."**
3. Fill in:
   - **name:** BUILTECH
   - **type:** script
   - **description:** BUILTECH Reddit automation
   - **redirect uri:** http://localhost

---

## Step 2: Get Credentials

After creating, you'll get:
- **client_id** - 14-character ID under the app name
- **client_secret** - Private key (don't share!)

---

## Step 3: OAuth Scopes Needed

For posting, we need these scopes:
```
submit read account
```

---

## Authentication Methods

### Method 1: Script/App-Only (Recommended for automation)

For personal script automation, use **installed_client** grant:

```python
import requests
import base64

# Your credentials
CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"
DEVICE_ID = "DO_NOT_TRACK_THIS_DEVICE"  # or generate unique

# Get token
auth = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()

response = requests.post(
    "https://www.reddit.com/api/v1/access_token",
    data={
        "grant_type": "https://oauth.reddit.com/grants/installed_client",
        "device_id": DEVICE_ID
    },
    headers={"Authorization": f"Basic {auth}"}
)

data = response.json()
access_token = data["access_token"]
```

---

### Method 2: User OAuth (More permissions)

1. Direct user to: 
```
https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&state=RANDOM&redirect_uri=http://localhost&duration=permanent&scope=submit+read+account
```

2. User approves → gets code in redirect URL

3. Exchange code for token:
```python
response = requests.post(
    "https://www.reddit.com/api/v1/access_token",
    data={
        "grant_type": "authorization_code",
        "code": "CODE_FROM_URL",
        "redirect_uri": "http://localhost"
    },
    headers={"Authorization": f"Basic {auth}"}
)
```

---

## API Endpoints

### Submit a Post

```python
# To a subreddit
response = requests.post(
    "https://oauth.reddit.com/r/HVAC/submit",
    headers={
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    },
    json={
        "sr": "HVAC",
        "kind": "self",
        "title": "Your Title",
        "text": "Your post content"
    }
)
```

### Post Types
- `kind: "self"` - Text post
- `kind: "link"` - Link post

---

## Posting Rules (Important!)

### Reddit's Terms
- Don't spam
- Don't post the same content repeatedly
- Don't be overly promotional
- Participate authentically

### Best Practices
- Post to relevant subreddits
- Add value first, promote second
- Don't just drop links
- Engage with comments
- Follow each subreddit's rules

---

## Rate Limits

| Action | Limit |
|--------|-------|
| Posts per minute | 10 |
| Comments per minute | 60 |
| Submissions per day | ~50 |

---

## Implementation

### Python Script Structure

```python
#!/usr/bin/env python3
"""Reddit automation for BUILTECH"""

import requests
import base64
import time
import random

CLIENT_ID = "YOUR_CLIENT_ID"
CLIENT_SECRET = "YOUR_CLIENT_SECRET"

SUBREDDITS = ["HVAC", "Plumbing", "electricians", "Contractors", "construction"]

POSTS = [
    {
        "title": "What software do you use for your HVAC business?",
        "text": "We're researching construction software for contractors. Would love to hear what tools you're using and what you wish existed!",
        "sub": "HVAC"
    },
    # Add more posts...
]

def get_token():
    auth = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    response = requests.post(
        "https://www.reddit.com/api/v1/access_token",
        data={
            "grant_type": "https://oauth.reddit.com/grants/installed_client",
            "device_id": "BUILTECH_POSTER"
        },
        headers={"Authorization": f"Basic {auth}"}
    )
    return response.json()["access_token"]

def submit_post(token, post):
    response = requests.post(
        f"https://oauth.reddit.com/r/{post['sub']}/submit",
        headers={
            "Authorization": f"Bearer {token}",
            "User-Agent": "BUILTECH/1.0"
        },
        json={
            "sr": post["sub"],
            "kind": "self",
            "title": post["title"],
            "text": post["text"]
        }
    )
    return response.json()

def main():
    token = get_token()
    for post in POSTS:
        result = submit_post(token, post)
        print(f"Posted to r/{post['sub']}: {result}")
        time.sleep(60)  # Rate limit

if __name__ == "__main__":
    main()
```

---

## What's Needed from You

To enable Reddit posting, I need:

| Credential | Where to Find |
|------------|---------------|
| **client_id** | Reddit app settings |
| **client_secret** | Reddit app settings |

---

## Alternative: Manual Posting (Faster to Start)

While we set up the API, you can manually post. Here are ready-made posts:

### Ready to Post:

**r/HVAC:**
> "What software do you use for your HVAC business? We're researching tools for contractors. Would love to hear your experience!"

**r/Plumbing:**
> "Plumbers - what's your go-to software? Looking for recommendations for field service management."

**r/Contractors:**
> "General contractors - Procore vs Buildertrend vs Jobber? Need real feedback from people who use these daily."

---

## Next Steps

1. **Get credentials** from https://www.reddit.com/prefs/apps
2. **Send me** client_id and client_secret
3. **I'll set up** automated posting!

Or start **manual posting** with the templates above.
