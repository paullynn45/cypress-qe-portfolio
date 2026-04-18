/// <reference types="cypress" />

describe("Unsuccessful Login Invalid Credentials", function () {
    const availablefixtures = [
        //Unsuccessful Login Username and Password Both Invalid
      {
        name: "invalidLoginCredentials1",
        context: "1",
      },
      //Unsuccessful Login Valid Username Invalid Password
      {
        name: "invalidLoginCredentials2",
        context: "2",
      },
      //Unsuccessful Login Invalid Username Valid Password
      {
        name: "invalidLoginCredentials3",
        context: "3",
      },
    ];
    availablefixtures.forEach((afixture) => {
      describe(afixture.context, () => {
        beforeEach(function () {
            cy.fixture(afixture.name).as("invalidLoginCredentials");
        });
            it("Invalid Login Test" + afixture.name, function () {
            cy.loginAs(this.invalidLoginCredentials.userName, this.invalidLoginCredentials.password)
            cy.get('#password-helper-text').invoke('text').then( text => {
                expect(text).to.equal('Please enter a valid username/password')
                })
            })
        })
    })
})
