module.exports = { shopFlow };

async function shopFlow(page) {
  await page.goto("https://www.bitheap.tech/");
  await page.click("#menu-item-1310");
}