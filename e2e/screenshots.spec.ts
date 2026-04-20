import { test } from "@playwright/test";

/**
 * Screenshot tests for PR review.
 * Captures key pages in both light and dark modes.
 */

test.describe("Screenshots", () => {
  test("homepage - light mode", async ({ page }) => {
    await page.goto("/");
    await page.screenshot({
      path: "test-results/screenshots/homepage-light.png",
      fullPage: true,
    });
  });

  test("homepage - dark mode", async ({ page }) => {
    await page.goto("/");
    // Click dark mode toggle
    await page.getByRole("button", { name: /switch to dark mode/i }).click();
    await page.screenshot({
      path: "test-results/screenshots/homepage-dark.png",
      fullPage: true,
    });
  });

  test("404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await page.screenshot({
      path: "test-results/screenshots/404.png",
      fullPage: true,
    });
  });
});
