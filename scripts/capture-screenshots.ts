import { chromium } from "@playwright/test";

/**
 * Capture screenshots of key pages for PR review.
 * Run manually or in CI to generate visual diffs.
 */

async function captureScreenshots() {
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  // Homepage - light mode
  const page1 = await context.newPage();
  await page1.goto(baseUrl);
  await page1.screenshot({ path: "test-results/screenshots/homepage-light.png", fullPage: true });
  await page1.close();

  // Homepage - dark mode
  const page2 = await context.newPage();
  await page2.goto(baseUrl);
  await page2.getByRole("button", { name: /switch to dark mode/i }).click();
  await page2.screenshot({ path: "test-results/screenshots/homepage-dark.png", fullPage: true });
  await page2.close();

  // 404 page
  const page3 = await context.newPage();
  await page3.goto(`${baseUrl}/this-page-does-not-exist`);
  await page3.screenshot({ path: "test-results/screenshots/404.png", fullPage: true });
  await page3.close();

  await browser.close();
  console.log("Screenshots captured in test-results/screenshots/");
}

captureScreenshots().catch(console.error);
