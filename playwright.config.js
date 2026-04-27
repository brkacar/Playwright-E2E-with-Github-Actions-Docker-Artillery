const config = {
  timeout: 60000,
  expect: {
    timeout: 15000, // toBeVisible() etc. will wait up to 15s
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    actionTimeout: 15000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true
  },
};

module.exports = config;