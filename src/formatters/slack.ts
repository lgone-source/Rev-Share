import { RevShareEntry } from "../types";
import { KnownBlock } from "@slack/bolt";

export function formatRevShareBlocks(entries: RevShareEntry[]): KnownBlock[] {
  if (entries.length === 0) {
    return [
      {
        type: "section",
        text: { type: "mrkdwn", text: ":mag: No rev share data found for that partner." },
      },
    ];
  }

  const period = entries[0].period;
  const rows = entries
    .map((e) => `• *${e.partner.name}*  |  ${e.rate.toFixed(2)}%  |  ${e.currency}`)
    .join("\n");

  return [
    {
      type: "header",
      text: { type: "plain_text", text: `📊 Rev Share Summary — ${period}`, emoji: true },
    },
    { type: "divider" },
    {
      type: "section",
      text: { type: "mrkdwn", text: rows },
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
  ];
}
