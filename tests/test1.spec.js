const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');

test.describe('My Test Suite', () => {
  test('My Test Case', async ({page}) => {
 
    await Login(page);

    await prepareOrder(page);

    await placeOrder(page);

  });
});

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
    //await page.screenshot({ path: 'login_test.png' });
}

async function prepareOrder(page) {
  await page.click('#menu-item-1310');
  await page.locator('xpath=//*[@id="main"]/nav/ul/li[2]/a').click();
  await page.locator('a[aria-label="Add to cart: “Demo Item for Automation Practice Course”"]').click();
  await page.locator('xpath=/html/body/nav/div[1]/div[3]/div/a').click();
  await page.getByText('Proceed to checkout').click();
  await page.getByPlaceholder('House number and street name').fill('test');
}

async function placeOrder(page) {
  await page.locator('xpath=//*[@id="billing_postcode"]').fill('0123');
  await page.locator('css=#billing_city').fill('Zurich');
  await page.click('#place_order');
  expect(await page.getByText('Order received').count()).toBe(1);
}