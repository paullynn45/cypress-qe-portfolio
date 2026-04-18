/// <reference types="cypress" />

import loginPage from "../../support/pageObjects/loginPage";

describe.only("Unsuccessful Feedback Form Submission", function () {
    const login = new loginPage();

    const availablefixtures = [
        //First Profile of Invalid Data
      {
        name: "invalidFeedbackData1",
        context: "1",
      },
        //Second Profile of Invalid Data
      {
        name: "invalidFeedbackData2",
        context: "2",
      },
        //Third Profile of Invalid Data
      {
        name: "invalidFeedbackData3",
        context: "3",
      },
    ];
    availablefixtures.forEach((afixture) => {
      describe(afixture.context, () => {
        beforeEach(function () {
            login.navigate()
            login.login()
            login.signIn()
            cy.fixture(afixture.name).as("invalidFeedbackFormSubmission");
        });
            it("Invalid Feedback Form Submission" + afixture.name, function () {

            cy.get('#email').type(this.invalidFeedbackFormSubmission.emailAddress)
            cy.get('#email').should('have.attr', 'aria-invalid', 'true')
            cy.get('#phone').type(this.invalidFeedbackFormSubmission.phoneNumber)
            cy.get('#phone').should('have.attr', 'aria-invalid', 'true')
            cy.get('#postcode').type(this.invalidFeedbackFormSubmission.postCode)
            cy.get('#postcode').should('have.attr', 'aria-invalid', 'true')
            cy.get('#submit').should('be.disabled')
            })
        })
    })
})

