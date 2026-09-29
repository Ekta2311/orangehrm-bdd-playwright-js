const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { randomBytes } = require('crypto');
const path = require('path');
const fs = require('fs/promises');
const { use, artifacts } = require('../../playwright.config');
const TestContext = require('../../fixtures/TestContext');
const LoginPage = require('../../pages/LoginPage');
const PimPage = require('../../pages/PimPage');
const EmployeeApi = require('../../api/EmployeeApi');
const employee = require('../../test-data/employeeData.json');

setDefaultTimeout(60000);

Before(async function () {
  employee.employeeId = `AUTO${randomBytes(3).toString('hex').toUpperCase()}`;
  this.ctx = new TestContext();
  await this.ctx.start();
  this.loginPage = new LoginPage(this.ctx.page, this.ctx.helper);
  this.pimPage = new PimPage(this.ctx.page, this.ctx.helper);
  this.employeeApi = new EmployeeApi(this.ctx.api);
});

After(async function (scenario) {
  const failed = scenario.result?.status === 'FAILED';
  if (failed && this.ctx?.page && use.screenshot === 'only-on-failure') {
    await fs.mkdir(artifacts.screenshotDir, { recursive: true });
    const safeName = scenario.pickle.name.replace(/[^a-z0-9]/gi, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await this.ctx.page.screenshot({
      path: path.join(artifacts.screenshotDir, `${safeName}-${timestamp}.png`),
      fullPage: true
    });
  }
  await this.ctx?.close({
    keepVideo: use.video === 'on' || (failed && use.video === 'retain-on-failure')
  });
});

Given('I login to OrangeHRM with valid credentials', async function () {
  await this.loginPage.login();
});

Then('I should see the Dashboard', async function () {
  await this.loginPage.verifyDashboard();
});

When('I navigate to PIM Add Employee', async function () {
  await this.pimPage.openAddEmployee();
});

When('I create a new employee using test data', async function () {
  await this.pimPage.addEmployee(employee);
});

Then('the employee should be created successfully', async function () {
  await this.pimPage.verifyEmployeeSaved();
});

When('I search for the newly created employee by Employee ID', async function () {
  await this.pimPage.openEmployeeList();
  await this.pimPage.searchEmployee(employee.employeeId);
});

Then('the employee should be visible in the employee list', async function () {
  await this.pimPage.verifyEmployeeInList(employee.employeeId);
});

When('I validate the employee through the API', async function () {
  this.apiCreateResponse = await this.employeeApi.createTestRecord(employee);
});

Then('the API response should contain the employee test data', async function () {
  if (!this.apiCreateResponse.ok()) throw new Error(`API create failed: ${this.apiCreateResponse.status()}`);
  const body = await this.apiCreateResponse.json();
  this.apiRecordId = body.id;
  if (body.employeeId !== employee.employeeId) throw new Error('API employee ID does not match UI test data');
});

When('I delete the newly created employee from the UI', async function () {
  await this.pimPage.deleteEmployee(employee.employeeId);
});

Then('the employee should be deleted from the UI', async function () {
  await this.pimPage.verifyDeleted(employee.employeeId);
});

Then('the employee API record should be deleted', async function () {
  if (!this.apiRecordId) return;
  const response = await this.employeeApi.deleteRecord(this.apiRecordId);
  if (![200, 204].includes(response.status())) throw new Error(`API delete failed: ${response.status()}`);
});

When('I logout from OrangeHRM', async function () {
  await this.loginPage.logout();
});

Then('I should be returned to the login page', async function () {
  await this.ctx.helper.assertVisible(this.loginPage.loginButton, 'Login page should be visible after logout');
});
