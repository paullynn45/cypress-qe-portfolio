/// <reference types="cypress" />

import feedbackPage from "../../support/pageObjects/feedbackPage";

describe("Unsuccessful Feedback Form Submission", function () {
    const feedback = new feedbackPage();

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
            cy.login()
            cy.fixture(afixture.name).as("invalidFeedbackFormSubmission");
        });
        it("Invalid Feedback Form Submission" + afixture.name, function () {
            // Fill mandatory fields with valid values so the submit-disabled
            // assertion proves the invalid email/phone/postcode are the cause.
            feedback
                .fillFirstName('Test')
                .fillLastName('User')
                .fillFeedback('Test feedback content')
                .fillEmail(this.invalidFeedbackFormSubmission.emailAddress)
                .expectFieldInvalid('#email')
                .fillPhone(this.invalidFeedbackFormSubmission.phoneNumber)
                .expectFieldInvalid('#phone')
                .fillPostcode(this.invalidFeedbackFormSubmission.postCode)
                .expectFieldInvalid('#postcode')
                .expectSubmitDisabled()
        })
      })
    })
})
