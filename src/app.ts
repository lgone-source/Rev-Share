import "dotenv/config";
import { App } from "@slack/bolt";
import { registerRevShareCommand } from "./commands/revShare";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: process.env.SLACK_APP_TOKEN !== undefined,
  appToken: process.env.SLACK_APP_TOKEN,
  port: Number(process.env.PORT) || 3000,
});

registerRevShareCommand(app);

(async () => {
  await app.start();
  console.log("⚡ Rev Share bot running");
})();
