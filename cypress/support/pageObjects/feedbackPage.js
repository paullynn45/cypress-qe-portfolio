/// <reference types="cypress" />

export class feedbackPage {

    fillFirstName(value) {
        cy.get('#firstname').clear().type(value)
        return this
    }

    fillLastName(value) {
        cy.get('#lastname').clear().type(value)
        return this
    }

    fillEmail(value) {
        cy.get('#email').clear().type(value)
        return this
    }

    fillPhone(value) {
        cy.get('#phone').clear().type(value)
        return this
    }

    fillCompany(value) {
        cy.get('#company').clear().type(value)
        return this
    }

    fillPostcode(value) {
        cy.get('#postcode').clear().type(value)
        return this
    }

    fillFeedback(value) {
        // Textarea has a defaultValue of "Dear Sir/Madam..." — clear before typing
        // so assertions reflect only the value the test supplied.
        cy.get('#feedback').clear().type(value)
        return this
    }

    selectPriority(value) {
        cy.get('select').select(value)
        return this
    }

    submit() {
        cy.get('#submit').click()
        return this
    }

    fillMandatoryFields(data) {
        return this
            .fillFirstName(data.firstName)
            .fillLastName(data.lastName)
            .fillEmail(data.emailAddress)
            .fillPhone(data.phoneNumber)
            .fillPostcode(data.postCode)
            .fillFeedback(data.yourFeeback)
    }

    fillAllFields(data) {
        return this
            .fillMandatoryFields(data)
            .fillCompany(data.company)
    }

    expectFieldValid(fieldSelector) {
        cy.get(fieldSelector).should('have.attr', 'aria-invalid', 'false')
        return this
    }

    expectFieldInvalid(fieldSelector) {
        cy.get(fieldSelector).should('have.attr', 'aria-invalid', 'true')
        return this
    }

    expectSubmitEnabled() {
        cy.get('#submit').should('be.enabled')
        return this
    }

    expectSubmitDisabled() {
        cy.get('#submit').should('be.disabled')
        return this
    }

    expectThankYouMessage() {
        cy.get('[class="MuiTypography-root feedback__sent MuiTypography-h6"]').invoke('text').then(text => {
            expect(text).to.equal('Thank you for your feedback')
        })
        return this
    }
}

export default feedbackPage
