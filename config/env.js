require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  username: process.env.ORANGEHRM_USERNAME || 'Admin',
  password: process.env.ORANGEHRM_PASSWORD || 'admin123',
  headless: String(process.env.HEADLESS || 'true').toLowerCase() === 'true',
  apiBaseUrl: process.env.API_BASE_URL || 'https://reqres.in/api'
};
