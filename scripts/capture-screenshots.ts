import { chromium } from "@playwright/test";

/**
 * Capture screenshots of sections marked with data-screenshot for PR review.
 * Add data-screenshot="section-name" to any element worth reviewing in a PR.
 * Run in CI after the dev server starts to generate visual artifacts.
 */

async function captureScreenshots() {
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  const browser = await chromium.launch();

  for (const scheme of ["light", "dark"] as const) {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      colorScheme: scheme,
    });
    const page = await context.newPage();
    await page.goto(baseUrl);

    if (scheme === "dark") {
      await page.getByRole("button", { name: /switch to dark mode/i }).click();
    }

    const sections = await page.locator("[data-screenshot]").all();
    for (const section of sections) {
      const name = await section.getAttribute("data-screenshot");
      await section.screenshot({ path: `pr-screenshots/${name}-${scheme}.png` });
    }

    await context.close();
  }

  await browser.close();
  console.log("Screenshots captured in pr-screenshots/");
}

captureScreenshots()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
