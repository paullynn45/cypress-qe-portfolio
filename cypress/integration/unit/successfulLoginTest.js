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
        cy.get('[class="MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom"]').invoke('text').then( text => {
            expect(text).to.equal('Feedback Form')
        })
    })
})