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
        cy.contains('Sign In').click()
        }
    }
    
export default loginPage