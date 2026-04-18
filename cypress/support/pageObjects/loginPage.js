/// <reference types="cypress" />

export class loginPage {

    navigate() {
        cy.visit("/");
    }

    login() {
        // Credentials resolve through Cypress.env() so the same spec can run
        // against demo defaults (cypress.json), a local override
        // (cypress.env.json, gitignored), or CI env vars (CYPRESS_TEST_USER /
        // CYPRESS_TEST_PASS). Nothing sensitive is committed.
        cy.get('#username').type(Cypress.env('TEST_USER'))
        cy.get('#password').type(Cypress.env('TEST_PASS'))
        }

    signIn() {
        // Use the stable component class instead of matching button text,
        // which is brittle to copy changes and ambiguous if the same text
        // appears elsewhere on the page.
        cy.get('.signin-form__submit').click()
        }

    expectFeedbackFormVisible() {
        cy.contains('Feedback Form').should('be.visible')
        }
    }

export default loginPage
