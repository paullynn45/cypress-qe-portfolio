/// <reference types="cypress" />

import loginPage from "../support/pageObjects/loginPage";

describe('Successful Login Valid Credentials', () => {
    const login = new loginPage();

    it('Login Success', function ()
    {
        login.navigate()
        login.login()
        login.signIn()
        login.expectFeedbackFormVisible()
    })
})
