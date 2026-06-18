import { SlashCommand, App } from "@slack/bolt";
import { fetchRevShareData } from "../integrations/cat";
import { formatRevShareBlocks } from "../formatters/slack";

export function registerRevShareCommand(app: App): void {
  app.command("/rev-share", async ({ command, ack, respond }) => {
    await ack();

    const partnerFilter = command.text.trim() || undefined;

    try {
      const entries = await fetchRevShareData(partnerFilter);
      const blocks = formatRevShareBlocks(entries);
      await respond({ blocks, response_type: "in_channel" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      await respond({
        response_type: "ephemeral",
        text: `:warning: Failed to fetch rev share data: ${message}`,
      });
    }
  });
}
