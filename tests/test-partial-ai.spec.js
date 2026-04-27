import { test, expect } from "@playwright/test";
import { auto } from "auto-playwright/dist";

const aiOptions = { model: "gpt-4o-mini" };

test.skip("should authenticate to bitheap.tech", async ({ page }) => {
    test.setTimeout(120000);

    await page.goto("https://bitheap.tech");

    // Step 1: Open login popup
    await auto("click on any of the Login buttons on this website", { page, test }, aiOptions);

    // Step 2: Wait for popup to fully appear
    await page.waitForSelector(".xoo-el-popup-active", { state: "visible" });

    // Step 3: Fill credentials
    await page.fill('input[name="xoo-el-username"]', "playwright");
    await page.fill('input[name="xoo-el-password"]', "playwright");

    // Step 4: Click the specific Sign In button
    await page.locator('button.xoo-el-login-btn').click({ force: true });

    // Wait for navigation/response after login
    await page.waitForLoadState("networkidle");

    // Step 5: Assert login success more broadly
    const registrationSuccess = await auto(
        "has the user successfully logged in? Check if there is a welcome message, user menu, or logout button visible",
        { page, test },
        aiOptions
    );
    expect(registrationSuccess).toBe(true);
});