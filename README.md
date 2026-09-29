# OrangeHRM - Playwright + JavaScript + Cucumber BDD

## Stack
- Playwright
- JavaScript
- Cucumber BDD
- Page Object Model
- Reusable Helper layer
- Playwright APIRequestContext
- HTML report
- Video recording
- Failure screenshots

## Architecture
Feature -> Step Definitions -> Page Objects -> Helper -> Playwright

All common UI operations such as click, fill, type, dropdown selection, upload, waits, text/value retrieval and assertions are centralized in `helpers/Helper.js`.

## Setup
1. Install Node.js 18+.
2. Extract the project and open it in VS Code.
3. Copy `.env.example` to `.env` if you need environment overrides.
4. Run `npm install`.
5. Run `npm run install:browsers`.

## Run
`npm test`

Headed mode:
`npm run test:headed`

## Reports
HTML report: `reports/cucumber-report.html` (included in this repository)

Run videos: `reports/videos/` (included in this repository)

Failure screenshots: `reports/screenshots/`

## Assessment coverage
- Login and dashboard validation
- PIM Add Employee
- Data-driven employee input from JSON
- Employee ID
- Profile picture upload
- Employee search
- API validation and UI/API data cross-check
- Employee deletion
- API deletion validation
- Logout/session validation
- POM
- BDD
- Reusable helper methods
- HTML reporting
- Video recording
- README and configuration

## Important API note
The assessment allows an OrangeHRM API or a simulated/public test API. The API layer is isolated in `api/EmployeeApi.js` and defaults to ReqRes so it can be replaced without changing the Page Object layer.

## GitHub
Public repository: https://github.com/Ekta2311/orangehrm-bdd-playwright-js

The source code, test scripts, configuration, HTML report, and run videos are committed in this repository.
