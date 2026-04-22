import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders all key sections", async ({ page }) => {
    // Given the homepage is loaded
    await page.goto("/");

    // Then all primary section headings are visible
    await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "About", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Projects", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Behind the Scenes", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Recently Watched", level: 2 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Say hello", level: 2 })).toBeVisible();
  });

  test("has no axe accessibility violations", async ({ page }) => {
    // Given the homepage is loaded
    await page.goto("/");

    // Then there are no accessibility violations
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test("GitHub links open in a new tab", async ({ page }) => {
    // Given the homepage is loaded
    await page.goto("/");

    // Then GitHub links have the correct href and target
    const githubLinks = page.getByRole("link", { name: /github/i });
    await expect(githubLinks.first()).toHaveAttribute("href", "https://github.com/owenw2k");
    await expect(githubLinks.first()).toHaveAttribute("target", "_blank");
  });

  test("resume download link points to the PDF", async ({ page }) => {
    // Given the homepage is loaded
    await page.goto("/");

    // Then the resume link points to the correct file
    await expect(page.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/resume.pdf"
    );
  });

  test("dark mode toggle switches theme", async ({ page }) => {
    // Given the homepage is loaded in light mode
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    // When the dark mode toggle is clicked
    await page.getByRole("button", { name: /switch to dark mode/i }).click();

    // Then the page switches to dark mode
    await expect(html).toHaveClass(/dark/);
  });

  test("not-found page renders correctly", async ({ page }) => {
    // Given a non-existent route is visited
    await page.goto("/this-page-does-not-exist");

    // Then the 404 page is shown with a link back home
    await expect(page.getByRole("heading", { name: "Nothing here." })).toBeVisible();
    await expect(page.getByRole("link", { name: /back home/i })).toBeVisible();
  });
});
