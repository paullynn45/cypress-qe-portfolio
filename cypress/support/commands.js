// ***********************************************
// Custom Cypress commands.
// See https://on.cypress.io/custom-commands
// ***********************************************

import loginPage from "./pageObjects/loginPage";

// Default happy-path login using credentials resolved via Cypress.env()
// (TEST_USER / TEST_PASS). Use this in beforeEach hooks of any spec that
// needs to be inside the app but is not itself testing login behaviour.
Cypress.Commands.add('login', () => {
    const login = new loginPage();
    login.navigate();
    login.login();
    login.signIn();
});

// Explicit-credentials login for negative-path tests. Stays out of the
// LoginPage POM because the POM resolves its credentials from Cypress.env().
Cypress.Commands.add('loginAs', (userName, password) => {
    cy.visit('/');
    cy.get('#username').type(userName);
    cy.get('#password').type(password);
    cy.get('.signin-form__submit').click();
});
