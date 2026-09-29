class Helper {
  constructor(page) {
    this.page = page;
  }

  async click(locator) { await locator.click(); }
  async fill(locator, value) { await locator.fill(String(value)); }
  async type(locator, value) { await locator.pressSequentially(String(value)); }
  async clear(locator) { await locator.fill(''); }
  async press(locator, key) { await locator.press(key); }
  async selectOption(locator, value) { await locator.selectOption(value); }
  async selectCustomDropdown(dropdown, option) { await dropdown.click(); await this.page.getByRole('option', { name: option, exact: true }).click(); }
  async uploadFile(locator, filePath) { await locator.setInputFiles(filePath); }
  async check(locator) { await locator.check(); }
  async uncheck(locator) { await locator.uncheck(); }
  async hover(locator) { await locator.hover(); }

  async waitForVisible(locator, timeout = 10000) { await locator.waitFor({ state: 'visible', timeout }); }
  async waitForHidden(locator, timeout = 10000) { await locator.waitFor({ state: 'hidden', timeout }); }
  async waitForUrl(urlOrPattern, timeout = 10000) { await this.page.waitForURL(urlOrPattern, { timeout }); }
  async waitForLoadState(state = 'domcontentloaded') { await this.page.waitForLoadState(state); }
  async wait(ms) { await this.page.waitForTimeout(ms); }

  async getText(locator) { return (await locator.innerText()).trim(); }
  async getValue(locator) { return locator.inputValue(); }
  async isVisible(locator) { return locator.isVisible(); }

  async assertVisible(locator, message = 'Expected element to be visible') {
    await locator.waitFor({ state: 'visible' });
    if (!(await locator.isVisible())) throw new Error(message);
  }
  async assertText(locator, expected, message = 'Text assertion failed') {
    const actual = await this.getText(locator);
    if (actual !== expected) throw new Error(`${message}. Expected: ${expected}, Actual: ${actual}`);
  }
  async assertContainsText(locator, expected, message = 'Text assertion failed') {
    const actual = await this.getText(locator);
    if (!actual.includes(expected)) throw new Error(`${message}. Expected to contain: ${expected}, Actual: ${actual}`);
  }
  async assertValue(locator, expected, message = 'Value assertion failed') {
    const actual = await this.getValue(locator);
    if (actual !== expected) throw new Error(`${message}. Expected: ${expected}, Actual: ${actual}`);
  }
  async assertUrl(expected, message = 'URL assertion failed') {
    const actual = this.page.url();
    if (!actual.includes(expected)) throw new Error(`${message}. Expected URL to contain: ${expected}, Actual: ${actual}`);
  }

  async reload() { await this.page.reload({ waitUntil: 'domcontentloaded' }); }
}

module.exports = Helper;
