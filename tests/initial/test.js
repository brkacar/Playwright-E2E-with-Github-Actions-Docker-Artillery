/// <reference types="playwright" />

const { chromium } = require("playwright");
const { test } = require('@playwright/test');

test.describe('Login Test', () => {
    test('login with valid credentials', async ({ }) => {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await Login(page);
        await browser.close();
    });

});
/*
        Environment Variables are set in terminal before running the test:
        set USERNAME=playwright
        set PASSWORD=playwright
*/
async function Login(page) {
    await page.goto('https://bitheap.tech');
    await page.click('#menu-item-2330'); // Clicks the login menu item    
    await page.locator('input[name="xoo-el-username"]').fill(process.env.USERNAME);
    await page.locator('input[name="xoo-el-password"]').fill(process.env.PASSWORD);
    await page.click('.xoo-el-login-btn');
    const text = await page.locator('#menu-item-2333>a').textContent();
    const expectedMessage = "Hello, " + process.env.USERNAME.charAt(0).toUpperCase() + process.env.USERNAME.slice(1).toLowerCase();
    if (text != expectedMessage) {
        console.error("The authentication failed. Expected " + expectedMessage + "' but got '" + text + "'");
    }
    await page.screenshot({ path: 'login_test.png' });
}

