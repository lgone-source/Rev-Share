# Slack App Setup

Follow these steps once to create the Slack app before running the bot.

## 1. Create the app

1. Go to https://api.slack.com/apps → **Create New App** → **From scratch**
2. Name it `Rev Share Bot` and select your workspace

## 2. Enable Socket Mode (for local development)

1. In the left sidebar go to **Socket Mode**
2. Toggle it **on**
3. Generate an **App-Level Token** with scope `connections:write` — copy it as `SLACK_APP_TOKEN`

## 3. Add the slash command

1. Go to **Slash Commands** → **Create New Command**
   - Command: `/rev-share`
   - Request URL: `https://your-host/slack/events` (not used in Socket Mode, but required)
   - Description: `Get per-partner rev share breakdown`
   - Usage hint: `[partner name]`
2. Save

## 4. Set OAuth scopes

1. Go to **OAuth & Permissions** → **Bot Token Scopes**
2. Add: `commands`, `chat:write`
3. Install the app to your workspace
4. Copy the **Bot User OAuth Token** as `SLACK_BOT_TOKEN`

## 5. Copy the signing secret

1. Go to **Basic Information** → **App Credentials**
2. Copy **Signing Secret** as `SLACK_SIGNING_SECRET`

## 6. Configure environment

```bash
cp .env.example .env
# Fill in SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN
```

## 7. Run locally

```bash
npm install
npm run dev
```

Then in Slack type `/rev-share` or `/rev-share Partner Alpha`.

## Production deployment

For production, disable Socket Mode and point the slash command Request URL at your deployed host (e.g. `https://rev-share-bot.your-domain.com/slack/events`). Remove `SLACK_APP_TOKEN` from env.
