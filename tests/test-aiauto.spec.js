import { test, expect } from "@playwright/test";
import { auto } from "auto-playwright/dist";

const aiOptions = { model: "gpt-4o-mini" };

test.skip("should authenticate to bitheap.tech", async ({ page }) => {
    test.setTimeout(120000);

    await page.goto("https://bitheap.tech");

    // Step 1: Open login popup
    await auto("click on any of the Login buttons on this website", { page, test }, aiOptions);

    // Step 2: Wait for popup to fully appear
    await auto("wait for the fields with 'Username / Email' and 'Password' placeholders to appear", { page, test }, aiOptions);

    // Step 3: Fill credentials
    await auto("fill the fields with 'Username / Email' and 'Password' placeholders as 'playwright'", { page, test }, aiOptions);

    // Step 4: Click the specific Sign In button
    await auto("force click a button with text 'Sign in'", { page, test }, aiOptions);

    // Step 5: Assert login success more broadly
    await auto("Assert if there is 'Hello, Playwright' link text",{ page, test },aiOptions);
    
});