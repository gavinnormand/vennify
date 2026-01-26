import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://developer.spotify.com/dashboard");

  console.log("➡️ Log in manually, then press Enter here");
  await new Promise(resolve => process.stdin.once("data", resolve));

  await context.storageState({ path: "spotify-auth.json" });
  console.log("✅ Session saved");

  await browser.close();
})();