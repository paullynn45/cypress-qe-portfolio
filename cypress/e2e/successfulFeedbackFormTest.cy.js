/// <reference types="cypress" />

import feedbackPage from "../support/pageObjects/feedbackPage";

describe("Successful Feedback Form Submission", function () {
    const feedback = new feedbackPage();

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
            cy.login()
            cy.fixture(afixture.name).as("validFeedbackFormSubmission");
        });

        it("Valid Feedback Form Submission " + afixture.name, function () {
            feedback
                .fillAllFields(this.validFeedbackFormSubmission)
                .selectPriority(1)
                .expectFieldValid('#firstname')
                .expectFieldValid('#lastname')
                .expectFieldValid('#email')
                .expectFieldValid('#phone')
                .expectFieldValid('#company')
                .expectFieldValid('#postcode')
                .expectFieldValid('#feedback')
                .expectSubmitEnabled()
                .submit()
                .expectThankYouMessage()
        })
      })
    })
})
