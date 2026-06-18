import { RevShareEntry } from "../types";

interface Block {
  type: string;
  [key: string]: unknown;
}

export function formatWebhookPayload(entries: RevShareEntry[]): { blocks: Block[] } {
  const period = entries[0]?.period ?? "Unknown period";

  const rows = entries
    .map((e) => `• *${e.partner.name}*  |  ${e.rate.toFixed(2)}%  |  ${e.currency}`)
    .join("\n");

  return {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `📊 Rev Share Summary — ${period}`, emoji: true },
      },
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: rows || "_No rev share data found._" },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `_Data sourced from CAT pricing tool · ${entries.length} partner${entries.length !== 1 ? "s" : ""}_`,
          },
        ],
      },
    ],
  };
}
