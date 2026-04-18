/// <reference types="cypress" />

import loginPage from "../../support/pageObjects/loginPage";
import feedbackPage from "../../support/pageObjects/feedbackPage";

describe('End to End Journey Test Both Mandatory and Optional Fields Populated', () => {
    const login = new loginPage();
    const feedback = new feedbackPage();

    it('Login Success', function ()
    {
        login.navigate()
        login.login()
        login.signIn()
    })

    it('Form Submisson Success', () => {
        feedback
            .fillFirstName('Paul')
            .fillLastName('Lynn')
            .fillEmail('paul.lynn@test.com')
            .fillPhone('07777777777')
            .fillCompany('QE Labs')
            .fillPostcode('WA14 1EP')
            .selectPriority(1)
            .fillFeedback('I am providing some feedback to the feedback field')
            .submit()
            .expectThankYouMessage()
    })
})
