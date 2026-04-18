/// <reference types="cypress" />

import feedbackPage from "../support/pageObjects/feedbackPage";

describe('End to End Journey — Mandatory Fields Only', () => {
    const feedback = new feedbackPage();

    beforeEach(() => {
        cy.login()
        cy.fixture('validFeedbackData1').as('validFeedback')
    })

    it('submits the feedback form with mandatory fields only', function () {
        feedback
            .fillMandatoryFields(this.validFeedback)
            .submit()
            .expectThankYouMessage()
    })
})
