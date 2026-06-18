# Slack Incoming Webhook Setup

This bot posts a rev share digest to a Slack channel via an **Incoming Webhook** — no API keys, no bot tokens, just a single URL.

## 1. Create the webhook (2 minutes)

1. Open Slack and go to **Apps** → search for **Incoming WebHooks** → click **Add to Slack**
2. Under **Post to Channel**, pick the channel where you want the digest to appear (e.g. `#rev-share` or `#commercial`)
3. Click **Add Incoming WebHooks Integration**
4. Copy the **Webhook URL** — it looks like:
   ```
   (example: hooks.slack.com/services/T.../B.../...)
   ```

## 2. Configure environment

```bash
cp .env.example .env
```

Open `.env` and paste the webhook URL:
```
SLACK_WEBHOOK_URL=paste-your-webhook-url-here
```

## 3. Install and run

```bash
npm install

# Test immediately — posts to Slack right now
npm run post

# Start the weekly scheduler (every Monday 9 AM by default)
npm run dev
```

## 4. Change the schedule

Edit `CRON_SCHEDULE` in your `.env`. Use [crontab.guru](https://crontab.guru) to build a schedule.

Examples:
```
0 9 * * 1        # Every Monday at 9 AM (default)
0 8 * * 1,4      # Monday and Thursday at 8 AM
0 9 1 * *        # First day of every month at 9 AM
```

## 5. Wire up real CAT data

Once you have CAT API access (raise a Jira ticket at `checkout.atlassian.net/wiki/spaces/ATLAS/pages/1183547415/Access+to+CAT` — Antonio Vasilev approves):

1. Set `CAT_API_URL` and `CAT_API_KEY` in `.env`
2. Update `src/integrations/cat.ts` — the `TODO` comment marks the exact line to replace
3. Run `npm run post` to verify the output looks correct
