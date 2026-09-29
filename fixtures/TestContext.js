const { chromium, request } = require('@playwright/test');
const fs = require('fs/promises');
const { use, artifacts } = require('../playwright.config');
const Helper = require('../helpers/Helper');

class TestContext {
  async start() {
    await fs.mkdir(artifacts.videoDir, { recursive: true });
    this.browser = await chromium.launch({ headless: use.headless, timeout: use.launchOptions.timeout });
    this.context = await this.browser.newContext({
      baseURL: use.baseURL,
      recordVideo: { dir: artifacts.videoDir }
    });
    this.page = await this.context.newPage();
    this.page.setDefaultNavigationTimeout(use.navigationTimeout);
    this.helper = new Helper(this.page);
    this.api = await request.newContext();
    await this.page.goto(use.baseURL, { waitUntil: 'commit' });
    await this.page.getByPlaceholder('Username').waitFor({ state: 'visible', timeout: use.navigationTimeout });
  }

  async close({ keepVideo = false } = {}) {
    const video = this.page?.video();
    if (this.context) await this.context.close();
    if (video && !keepVideo) {
      await fs.rm(await video.path(), { force: true });
    }
    if (this.api) await this.api.dispose();
    if (this.browser) await this.browser.close();
  }
}
module.exports = TestContext;
