const config = {
  timeout: 120000,
  use: {
    screenshot: 'only-on-failure',
    browserName: 'firefox',
    headless: true 
  },
};

module.exports = config;