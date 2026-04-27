/*
npm install -g @google/gemini-cli
gemini
This test created by Gemini CLI for the prompt:
 open Google.com, find the search bar and type plwywright mcp and press enter
*/
const { test, expect } = require('@playwright/test');

test('search google for playwright mcp', async ({ page }) => {
  await page.goto('https://www.google.com');

  // Handle cookie consent if it appears
  const acceptButton = page.locator('button:has-text("Accept all"), button:has-text("I agree")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Find the search bar and type "playwright mcp"
  const searchBar = page.locator('[name="q"]');
  await searchBar.waitFor({ state: 'visible' });
  await searchBar.fill('playwright mcp');

  // Press Enter
  await searchBar.press('Enter');

  // Wait for results to load
  await page.waitForLoadState('networkidle');

  // Optional: Take a screenshot to verify
  await page.screenshot({ path: 'google_search_results.png' });

  console.log('Search completed successfully.');
});
