const config = {
  timeout: 60000,
  use: {
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true
  },
};

module.exports = config;