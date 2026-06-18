import "dotenv/config";
import cron from "node-cron";
import { postRevShare } from "./poster";

const runOnce = process.argv.includes("--once");

if (runOnce) {
  postRevShare().catch((err) => {
    console.error("Failed to post rev share:", err.message);
    process.exit(1);
  });
} else {
  // Default: every Monday at 9:00 AM. Override with CRON_SCHEDULE env var.
  const schedule = process.env.CRON_SCHEDULE ?? "0 9 * * 1";
  cron.schedule(schedule, () => {
    postRevShare().catch((err) => console.error("Failed to post rev share:", err.message));
  });
  console.log(`⏰ Rev share scheduler running (${schedule})`);
}
