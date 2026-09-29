const { retries } = require('./playwright.config');

module.exports = {
  default: {
    require: ['features/step-definitions/**/*.js'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    publishQuiet: true,
    retry: retries,
    timeout: 60000
  }
};
