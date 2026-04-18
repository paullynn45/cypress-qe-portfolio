/// <reference types="cypress" />

import loginPage from "../../support/pageObjects/loginPage";

describe('End to End Journey Test Both Mandatory and Optional Fields Populated', () => {
    const login = new loginPage();

    it('Login Success', function ()       
    {
        login.navigate()
        login.login()
        login.signIn()
    })

    it('Form Submisson Success', () => {
        cy.get('#firstname').type('Paul')
        cy.get('#lastname').type('Lynn')
        cy.get('#email').type('paul.lynn@test.com')
        cy.get('#phone').type('07777777777')
        cy.get('#company').type('QE Labs')
        cy.get('#postcode').type('WA14 1EP')
        cy.get('select').select(1).should('have.value', '2')
        cy.get('#feedback').type('I am providing some feedback to the feedback field')
        cy.get('#submit').click()
        cy.get('[class="MuiTypography-root feedback__sent MuiTypography-h6"]').invoke('text').then( text => {
            expect(text).to.equal('Thank you for your feedback')
        })
    })
})
