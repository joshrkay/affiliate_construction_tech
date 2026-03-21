# Cron Job Setup for Status Updates

## Quick Setup

### Option 1: OpenClaw Cron (Recommended)
Add to your OpenClaw configuration:

```json
{
  "cron": {
    "status-update": {
      "schedule": "0 */2 * * *",
      "command": "bash /root/.openclaw/workspace/affiliate_construction_tech/scripts/status-update.sh",
      "enabled": true
    }
  }
}
```

### Option 2: Standard Cron
Run this command:

```bash
crontab -e
```

Add this line:

```
0 */2 * * * /root/.openclaw/workspace/affiliate_construction_tech/scripts/status-update.sh >> /root/.openclaw/workspace/affiliate_construction_tech/cron/status-updates.log 2>&1
```

---

## What It Does

Every 2 hours, the script will:

1. ✅ Check site status (HTTP 200)
2. ✅ Count tools in database
3. ✅ Count articles
4. ✅ Count comparisons
5. ✅ Log to status-updates.log
6. ✅ (Optional) Send to Discord webhook

---

## Schedule Options

| Frequency | Cron Expression |
|-----------|-----------------|
| Every 2 hours | `0 */2 * * *` |
| Every hour | `0 * * * *` |
| Every 6 hours | `0 */6 * * *` |
| Daily at 9am | `0 9 * * *` |

---

## Discord Integration (Optional)

To send updates to Discord:

```bash
export DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_URL"
```

Add to cron:
```
0 */2 * * * DISCORD_WEBHOOK_URL="YOUR_URL" /root/.openclaw/workspace/affiliate_construction_tech/scripts/status-update.sh
```

---

## Log File

Logs are stored at:
```
/root/.openclaw/workspace/affiliate_construction_tech/cron/status-updates.log
```

---

## Current Status

⏰ **Not yet activated** - awaiting your cron configuration

The script is ready at:
```
/root/.openclaw/workspace/affiliate_construction_tech/scripts/status-update.sh
```
