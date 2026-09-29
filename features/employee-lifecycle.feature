Feature: Employee Lifecycle Management
  As an HR administrator
  I want to manage an employee through the OrangeHRM UI
  So that the complete employee lifecycle is validated

  @employeeLifecycle
  Scenario: Add, edit, validate through API, delete and logout an employee
    Given I login to OrangeHRM with valid credentials
    Then I should see the Dashboard
    When I navigate to PIM Add Employee
    And I create a new employee using test data
    Then the employee should be created successfully
    When I search for the newly created employee by Employee ID
    Then the employee should be visible in the employee list
    When I validate the employee through the API
    Then the API response should contain the employee test data
    When I delete the newly created employee from the UI
    Then the employee should be deleted from the UI
    And the employee API record should be deleted
    When I logout from OrangeHRM
    Then I should be returned to the login page
