const { username, password } = require('../config/env');

class LoginPage {
  constructor(page, helper) {
    this.page = page;
    this.helper = helper;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  }

  async login(user = username, pass = password) {
    await this.helper.fill(this.usernameInput, user);
    await this.helper.fill(this.passwordInput, pass);
    await this.helper.click(this.loginButton);
  }

  async verifyDashboard() {
    await this.helper.assertVisible(this.dashboardHeading, 'Dashboard should be visible after successful login');
  }

  async logout() {
    await this.helper.click(this.userMenu);
    await this.helper.click(this.logoutLink);
    await this.helper.assertVisible(this.loginButton, 'Login button should be visible after logout');
  }
}
module.exports = LoginPage;
