import { Given,Then, When, And } from "@badeball/cypress-cucumber-preprocessor";
import { candidateDataUtils } from "./dataUtils";
import { candidateAssertion } from './assertions';

after(function(){
    candidateDataUtils.deleteCandidateAPI()
})

Given('I open the OrangeHRM website', () => {
    cy.visit("/auth/login");
    
}); 

And('I login as an Admin', () => {
    cy.signIn(Cypress.env('username'),Cypress.env('password'));
});


And('I add a new Candidate', () => {
    candidateDataUtils.addCandidateAPI()
});

And('I open the Candidate', () =>{
    candidateDataUtils.openCandidate()
})

When('I change the candidate status to {string} using API', (Status:string) => {
    candidateDataUtils.changeStatusToWithAPI(Status)
    cy.reload()
});

Then('I should see Status: {string} in Application Stage', (Status:string) => {
    candidateAssertion.statusAssertionInsideRecord(Status)
});

And('I should see {string} buttons in Application Stage', (Actions: string) => {
    candidateAssertion.buttonsExistAssertionInCandidatePage(Actions)
});


