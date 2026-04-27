const config = {
  timeout: 120000,
  expect: {
    timeout: 30000, // toBeVisible() etc. will wait up to 15s
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    actionTimeout: 30000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true
  },
};

module.exports = config;