/// <reference types="cypress" />

import validLoginCredentials from "../../fixtures/validLoginCredentials.json";

export class loginPage {

    navigate() {
        cy.visit("/");
    }

    login() {
        cy.get('#username').type(validLoginCredentials.userName)
        cy.get('#password').type(validLoginCredentials.password)
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