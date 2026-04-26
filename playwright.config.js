const config = {
  timeout: 120000,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: { slowMo: 100 },
    headless: true
  },
};

module.exports = config;