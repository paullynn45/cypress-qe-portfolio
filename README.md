# Cypress QE Portfolio

[![Cypress E2E](https://github.com/paullynn45/cypress-qe-portfolio/actions/workflows/cypress.yml/badge.svg)](https://github.com/paullynn45/cypress-qe-portfolio/actions/workflows/cypress.yml)

A small React app — login screen plus a feedback form — used as a target for a Cypress test suite that demonstrates end-to-end test design patterns: page object model, fixture-driven data, custom commands, and CI-pipeline integration.

The application itself is intentionally minimal; the focus is the **test code**.

---

## Tech stack

- **App**: React 16, Material-UI 4, React Router 5
- **Tests**: Cypress 9.5 (headless Chrome)
- **CI**: GitHub Actions
- **Local serving**: Docker + Docker Compose

---

## Project structure

```
.
├── src/                              # React app (login + feedback form)
├── public/                           # Static assets
├── cypress/
│   ├── fixtures/                     # Valid + invalid test data profiles
│   ├── integration/
│   │   ├── unit/                     # Single-screen specs (login, feedback form)
│   │   └── e2e/                      # Cross-screen user journeys
│   └── support/
│       ├── commands.js               # cy.login, cy.loginAs custom commands
│       └── pageObjects/
│           ├── loginPage.js
│           └── feedbackPage.js
├── cypress.json                      # Cypress config + demo env defaults
├── cypress.env.example.json          # Template for cypress.env.json (gitignored)
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

### Test credentials

Tests read the sign-in credentials through `Cypress.env('TEST_USER')` / `Cypress.env('TEST_PASS')`. Demo defaults live in `cypress.json`. To run against different credentials without editing tracked files, copy `cypress.env.example.json` to `cypress.env.json` (gitignored) and set your own values — or export `CYPRESS_TEST_USER` / `CYPRESS_TEST_PASS` in your shell. CI injects them as env vars on the `cypress-io/github-action` step.

### Run via Docker (app + Cypress, orchestrated)

The repo includes a full Cypress-in-Docker setup. One command builds the app image, boots the app container, waits for it to pass a healthcheck, then runs the Cypress suite in an isolated `cypress/included` container against it. **No Node install required on the host** — just Docker.

```bash
docker compose up --build --abort-on-container-exit
docker compose down
```

The cypress container reaches the app at `http://app:3000` via Docker's service-name DNS and reads its credentials from `CYPRESS_TEST_USER` / `CYPRESS_TEST_PASS` env vars set in `docker-compose.yml`. Three independent test-execution paths — `npm start` + local Cypress, GitHub Actions CI, and `docker compose up` — all converge on the same suite.

---

## Test coverage

| Spec | Scenario |
|---|---|
| `unit/successfulLoginTest.js` | Valid credentials sign in and land on the feedback form |
| `unit/unsuccessfulLoginTest.spec.js` | Three invalid-credential profiles surface the correct helper text |
| `unit/successfulFeedbackFormTest.spec.js` | Three valid data profiles populate the form, pass field validation, and submit successfully |
| `unit/unsuccessfulFeedbackFormTest.spec.js` | Three invalid data profiles flag email/phone/postcode as invalid and keep submit disabled |
| `e2e/e2eJourneyMandatoryAndOptionalFields.js` | Full journey: login → fill all fields → submit → confirmation |
| `e2e/e2eJourneyMandatoryFieldsOnly.js` | Full journey: login → fill only mandatory fields → submit → confirmation |

---

## Design decisions

**Page Object Model.** `LoginPage` and `FeedbackPage` keep DOM mechanics out of specs. Each page exposes a fluent API (`feedback.fillEmail(value).expectFieldValid('#email')`) so specs read as test intent rather than a list of selectors.

**Fixture-driven data.** Each scenario class points to one or more JSON fixtures in `cypress/fixtures/`. Adding a fourth invalid-data profile is a one-file change with no spec edits. The `availablefixtures.forEach` pattern in the unit specs runs the same test logic over every profile.

**Custom commands over inline setup.** `cy.login()` (happy path, default fixture credentials) and `cy.loginAs(user, pass)` (explicit credentials, used by negative-path login tests) live in `cypress/support/commands.js`. Specs that need an authenticated session call them in `beforeEach` and stay focused on the scenario under test.

**Credentials via `Cypress.env()`, not committed fixtures.** The login page object reads `TEST_USER` / `TEST_PASS` through `Cypress.env()` rather than importing a committed JSON fixture. Precedence order: `CYPRESS_TEST_USER` / `CYPRESS_TEST_PASS` OS env vars (injected in CI via the GitHub Actions workflow) override `cypress.env.json` (gitignored, for local dev), which overrides the demo defaults in `cypress.json`. In a real app, `cypress.json` would have no defaults and `cypress.env.json` or CI secrets would be the only source — and the server would validate against a hashed password, not a client-side string comparison like the demo does.

**Semantic selectors over framework-generated class chains.** Earlier versions of these specs matched on Material-UI's auto-generated class strings (`MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom`) and on raw button text. Both are brittle to MUI upgrades and copy changes. Page objects now prefer stable component classes (`.signin-form__submit`) and `cy.contains()` against semantic content.

---

## Known limitations and planned improvements

- **Cypress 9.5 → 13.x**. Includes the migration to `cypress.config.js`, the `cypress/integration/` → `cypress/e2e/` folder move, and the `*.spec.js` → `*.cy.js` filename convention. Two caveats for whoever attempts it: regenerate `package-lock.json` with `npm install --userconfig=/dev/null` to avoid private-registry URLs leaking in from `~/.npmrc`, and do a surgical lockfile update (not a from-scratch regen) — a clean regen pulls newer transitives that trip a `react-dev-utils` dev-server bug on `noopServiceWorkerMiddleware`.
- **Material-UI 4 / React 16**. The app uses now-deprecated versions. Out of scope for a QE portfolio piece, but flagged.
- **No accessibility checks**. Adding `cypress-axe` would catch a11y regressions on the existing form.
- **No visual regression**. Cypress Image Snapshot or Percy would fit cleanly given the small surface.
- **No reporter**. Adding `mochawesome` would produce HTML test reports out of CI.

---

## Author

Paul Lynn — [@paullynn45](https://github.com/paullynn45)
