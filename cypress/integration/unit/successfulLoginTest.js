/// <reference types="cypress" />

import loginPage from "../../support/pageObjects/loginPage";

describe('Successful Login Valid Credentials', () => {
    const login = new loginPage();

    before(function () {
        cy.fixture('validLoginCredentials').then (function (data) {
          this.data = data
        })
    })

    it('Login Success', function ()
    {
        login.navigate()
        login.login()
        login.signIn()
        login.expectFeedbackFormVisible()
    })
})