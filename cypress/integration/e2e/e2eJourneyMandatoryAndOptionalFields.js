/// <reference types="cypress" />

import feedbackPage from "../../support/pageObjects/feedbackPage";

describe('End to End Journey — Mandatory and Optional Fields', () => {
    const feedback = new feedbackPage();

    beforeEach(() => {
        cy.login()
        cy.fixture('validFeedbackData1').as('validFeedback')
    })

    it('submits the feedback form with all fields populated', function () {
        feedback
            .fillAllFields(this.validFeedback)
            .selectPriority(1)
            .submit()
            .expectThankYouMessage()
    })
})
