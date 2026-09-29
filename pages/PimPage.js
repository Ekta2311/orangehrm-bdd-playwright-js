const path = require('path');

class PimPage {
  constructor(page, helper) {
    this.page = page;
    this.helper = helper;
    this.pimMenu = page.getByRole('link', { name: 'PIM', exact: true });
    this.employeeInformationHeading = page.getByRole('heading', { name: 'Employee Information' });
    this.addEmployeeMenu = page.getByRole('link', { name: 'Add Employee' });
    this.employeeListMenu = page.getByRole('link', { name: 'Employee List' });
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.employeeId = page.locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .getByRole('textbox');
    this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successToast = page.locator('.oxd-toast--success');
  }

  async openAddEmployee() {
    await this.helper.click(this.pimMenu);
    await this.helper.waitForVisible(this.employeeInformationHeading, 20000);
    await this.helper.click(this.addEmployeeMenu);
  }

  async addEmployee(data) {
    await this.helper.fill(this.firstName, data.firstName);
    await this.helper.fill(this.lastName, data.lastName);
    await this.helper.fill(this.employeeId, data.employeeId);
    const fileInput = this.page.locator('input[type="file"]');
    if (data.profilePicture) {
      await this.helper.uploadFile(fileInput, path.resolve(data.profilePicture));
    }
    await this.helper.click(this.saveButton);
    await this.helper.waitForVisible(this.personalDetailsHeading, 20000);
  }

  async verifyEmployeeSaved() {
    const body = this.page.locator('body');
    await this.helper.assertContainsText(body, 'Personal Details', 'Employee personal details page should be displayed');
  }

  async openEmployeeList() {
    await this.helper.click(this.pimMenu);
    await this.helper.waitForVisible(this.employeeInformationHeading, 20000);
    await this.helper.click(this.employeeListMenu);
  }

  async searchEmployee(employeeId) {
    await this.helper.fill(this.employeeId, employeeId);
    const search = this.page.getByRole('button', { name: 'Search' });
    await this.helper.click(search);
  }

  async verifyEmployeeInList(employeeId) {
    const row = this.page.getByRole('row').filter({ hasText: employeeId }).first();
    await this.helper.waitForVisible(row, 15000);
  }

  async deleteEmployee(employeeId) {
    await this.searchEmployee(employeeId);
    const row = this.page.getByRole('row').filter({ hasText: employeeId }).first();
    const deleteButton = row.getByRole('button').filter({ has: this.page.locator('i.bi-trash') }).first();
    await deleteButton.click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await this.helper.waitForHidden(row, 15000);
  }

  async verifyDeleted(employeeId) {
    await this.searchEmployee(employeeId);
    const row = this.page.getByRole('row').filter({ hasText: employeeId });
    if (await row.count() > 0) throw new Error(`Employee ${employeeId} is still present after deletion`);
  }
}
module.exports = PimPage;
