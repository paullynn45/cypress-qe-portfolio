# Cypress QE Portfolio

[![Cypress E2E](https://github.com/paullynn45/cypress-qe-portfolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/paullynn45/cypress-qe-portfolio/actions/workflows/cypress.yml)

A small React app — login screen plus a feedback form — used as a target for a Cypress test suite that demonstrates end-to-end test design patterns: page object model, fixture-driven data, custom commands, and CI-pipeline integration.

The application itself is intentionally minimal; the focus is the **test code**.

---

## Tech stack

- **App**: React 16, Material-UI 4, React Router 5
- **Tests**: Cypress 13 (headless Chrome)
- **CI**: GitHub Actions
- **Local serving**: Docker + docker-compose

---

## Project structure

```
.
├── src/                              # React app (login + feedback form)
├── public/                           # Static assets
├── cypress/
│   ├── fixtures/                     # Valid + invalid test data profiles
│   ├── e2e/                          # All Cypress specs (*.cy.js)
│   └── support/
│       ├── e2e.js                    # Auto-loaded before every spec
│       ├── commands.js               # cy.login, cy.loginAs custom commands
│       └── pageObjects/
│           ├── loginPage.js
│           └── feedbackPage.js
├── cypress.config.js                 # Cypress configuration
├── .github/workflows/cypress.yml     # CI pipeline
├── Dockerfile
└── docker-compose.yml
```

---

## Running locally

### Prerequisites

- Node 16 (`react-scripts 3.x` predates Node 17's OpenSSL change)
- npm 8+

### Install and start the app

```bash
npm install
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000).

Sign in with the hard-coded credentials:

```
Username: l.jenkins
Password: hunter2
```

### Run the Cypress suite

In a second terminal, with the app running:

```bash
npm run cy:headless     # all specs, headless
npm run cy:chrome       # all specs, headed Chrome
npx cypress open        # interactive mode
```

### Run via Docker

```bash
docker-compose up --build -d
```

---

## Test coverage

| Spec | Scenario |
|---|---|
| `successfulLoginTest.cy.js` | Valid credentials sign in and land on the feedback form |
| `unsuccessfulLoginTest.cy.js` | Three invalid-credential profiles surface the correct helper text |
| `successfulFeedbackFormTest.cy.js` | Three valid data profiles populate the form, pass field validation, and submit successfully |
| `unsuccessfulFeedbackFormTest.cy.js` | Three invalid data profiles flag email/phone/postcode as invalid and keep submit disabled |
| `e2eJourneyMandatoryAndOptionalFields.cy.js` | Full journey: login → fill all fields → submit → confirmation |
| `e2eJourneyMandatoryFieldsOnly.cy.js` | Full journey: login → fill only mandatory fields → submit → confirmation |

---

## Design decisions

**Page Object Model.** `LoginPage` and `FeedbackPage` keep DOM mechanics out of specs. Each page exposes a fluent API (`feedback.fillEmail(value).expectFieldValid('#email')`) so specs read as test intent rather than a list of selectors.

**Fixture-driven data.** Each scenario class points to one or more JSON fixtures in `cypress/fixtures/`. Adding a fourth invalid-data profile is a one-file change with no spec edits. The `availablefixtures.forEach` pattern in the unit specs runs the same test logic over every profile.

**Custom commands over inline setup.** `cy.login()` (happy path, default fixture credentials) and `cy.loginAs(user, pass)` (explicit credentials, used by negative-path login tests) live in `cypress/support/commands.js`. Specs that need an authenticated session call them in `beforeEach` and stay focused on the scenario under test.

**Semantic selectors over framework-generated class chains.** Earlier versions of these specs matched on Material-UI's auto-generated class strings (`MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom`) and on raw button text. Both are brittle to MUI upgrades and copy changes. Page objects now prefer stable component classes (`.signin-form__submit`) and `cy.contains()` against semantic content.

---

## Known limitations and planned improvements

- **Material-UI 4 / React 16**. The app uses now-deprecated versions. Out of scope for a QE portfolio piece, but flagged.
- **No accessibility checks**. Adding `cypress-axe` would catch a11y regressions on the existing form.
- **No visual regression**. Cypress Image Snapshot or Percy would fit cleanly given the small surface.
- **No reporter**. Adding `mochawesome` would produce HTML test reports out of CI.

---

## Author

Paul Lynn — [@paullynn45](https://github.com/paullynn45)
