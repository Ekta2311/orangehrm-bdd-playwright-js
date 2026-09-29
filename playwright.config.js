const path = require('path');
const { baseUrl, headless } = require('./config/env');

module.exports = {
  testDir: './features',
  retries: Number(process.env.TEST_RETRIES ?? 1),
  timeout: 60000,
  use: {
    browserName: 'chromium',
    baseURL: baseUrl,
    headless,
    launchOptions: { timeout: 30000 },
    navigationTimeout: 60000,
    screenshot: 'only-on-failure',
    video: 'on'
  },
  artifacts: {
    screenshotDir: path.resolve(__dirname, 'reports/screenshots'),
    videoDir: path.resolve(__dirname, 'reports/videos')
  }
};
