const config = {
  timeout: 60000,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true
  },
};

module.exports = config;