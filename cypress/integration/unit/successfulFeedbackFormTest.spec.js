/// <reference types="cypress" />

import loginPage from "../../support/pageObjects/loginPage";

describe.only("Successful Feedback Form Submission", function () {
    const login = new loginPage();

    const availablefixtures = [
        //First Profile of Valid Data
      {
        name: "validFeedbackData1",
        context: "1",
      },
        //Second Profile of Valid Data
      {
        name: "validFeedbackData2",
        context: "2",
      },
        //Third Profile of Valid Data
      {
        name: "validFeedbackData3",
        context: "3",
      },
    ];
    
    availablefixtures.forEach((afixture) => {
      describe(afixture.context, () => {
        beforeEach(function () {
            login.navigate()
            login.login()
            login.signIn()
            cy.fixture(afixture.name).as("validFeedbackFormSubmission");
        });

        it("Valid Feedback Form Submission" + afixture.name, function () {
            cy.get('#firstname').type(this.validFeedbackFormSubmission.firstName)
            cy.get('#firstname').should('have.attr', 'aria-invalid', 'false')
            cy.get('#lastname').type(this.validFeedbackFormSubmission.lastName)
            cy.get('#lastname').should('have.attr', 'aria-invalid', 'false')
            cy.get('#email').type(this.validFeedbackFormSubmission.emailAddress)
            cy.get('#email').should('have.attr', 'aria-invalid', 'false')
            cy.get('#phone').type(this.validFeedbackFormSubmission.phoneNumber)
            cy.get('#phone').should('have.attr', 'aria-invalid', 'false')
            cy.get('#company').type(this.validFeedbackFormSubmission.company)
            cy.get('#company').should('have.attr', 'aria-invalid', 'false')
            cy.get('#postcode').type(this.validFeedbackFormSubmission.postCode)
            cy.get('#postcode').should('have.attr', 'aria-invalid', 'false')
            cy.get('select').select(1).should('have.value', '2')
            cy.get('#feedback').type(this.validFeedbackFormSubmission.yourFeeback)
            cy.get('#feedback').should('have.attr', 'aria-invalid', 'false')
            cy.get('#submit').should('be.enabled')
            cy.get('#submit').click()
            cy.get('[class="MuiTypography-root feedback__sent MuiTypography-h6"]').invoke('text').then( text => {
                expect(text).to.equal('Thank you for your feedback')
                })
            })
        })
    })
})
