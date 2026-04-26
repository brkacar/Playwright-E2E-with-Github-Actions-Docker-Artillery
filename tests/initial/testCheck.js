/// <reference types="playwright" />

const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://bitheap.tech/')
    await page.screenshot({ path: 'screenshot.png' });

    /* selectors
       // css selector
        const button=await page.$('.submit-btn');
        // xpath selector
        const button2=await page.$('//button[@class="submit-btn"]');
        const button = await page.$x('//button[contains(@class, "submit-button")]'); 
        // custom selector
        await playwright.selectors.register('dataAttr', createDataAttrSelectorEngine);
        
        function createDataAttrSelectorEngine({ root, query }) {
        return Array.from(root.querySelectorAll([data-test-id="${query}"]));
        }

        const element = await page.$('dataAttr=my-custom-attribute');
        
        // asssertions
        await expect(page.locator('#submit-button')).toBeEnabled();
        await expect(page.locator('.list-item')).toHaveCount(3);
        await expect(page.locator('#welcome-message')).toHaveText('Welcome back, user!');
        await expect(page.locator('button#login')).toBeVisible();
        // hooks
        test.beforeEach(async ({ page }) => {
        console.log('Running before each test');
        await page.goto('https://example.com');
        });

        test.afterEach(async ({ page }) => {
        console.log('Running after each test');
        // Actions like taking screenshots if tests fail
        });
        //navigate
        const page = await browser.newPage();
        await page.goto('https://example.com');
        //click
        await page.click('#submit-button'); // Clicks a button with the ID 'submit-button'
        //type
        await page.type('input[name="username"]', 'myusername'); // Types 'myusername' into the input field
        //select
        await page.selectOption('#country', 'USA'); // Selects the option with the value 'USA' from a dropdown with the ID 'country'


    */

    await browser.close();



})();