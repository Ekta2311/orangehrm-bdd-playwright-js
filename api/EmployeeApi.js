const { apiBaseUrl } = require('../config/env');

class EmployeeApi {
  constructor(requestContext) {
    this.request = requestContext;
  }

  async createTestRecord(employee) {
    return this.request.post(`${apiBaseUrl}/users`, {
      data: {
        name: `${employee.firstName} ${employee.lastName}`,
        employeeId: employee.employeeId,
        jobTitle: employee.jobTitle,
        employmentStatus: employee.employmentStatus
      }
    });
  }

  async getRecord(id) { return this.request.get(`${apiBaseUrl}/users/${id}`); }
  async deleteRecord(id) { return this.request.delete(`${apiBaseUrl}/users/${id}`); }
}
module.exports = EmployeeApi;
