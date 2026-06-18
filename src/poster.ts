import { fetchRevShareData } from "./integrations/cat";
import { formatWebhookPayload } from "./formatters/slack";

export async function postRevShare(): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("SLACK_WEBHOOK_URL is not set in environment");

  const entries = await fetchRevShareData();
  const payload = formatWebhookPayload(entries);

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Slack webhook returned ${res.status}: ${await res.text()}`);
  }

  console.log(`✅ Rev share digest posted (${entries.length} partners)`);
}
