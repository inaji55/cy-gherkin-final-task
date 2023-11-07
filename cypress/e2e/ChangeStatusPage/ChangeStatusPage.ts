import { Given,Then, When, And } from "@badeball/cypress-cucumber-preprocessor";
import { changeStatusActions } from "./actions";
import { changeStatusAssertion } from "./assertions";
import { changeStatusDataUtils } from "./dataUtils";

after(function(){
    changeStatusDataUtils.deleteCandidateAPI()
})

Given('common step: I open the OrangeHRM website', () => {
    cy.visit("/auth/login");
    
}); 

And('common step: I login as an Admin', () => {
    cy.signIn(Cypress.env('username'),Cypress.env('password'));
}); 


And('I add a new Candidate with API', () => {
    changeStatusDataUtils.addCandidateAPI()
});

And('I open the Candidate', () =>{
    changeStatusDataUtils.openCandidate()
})

And ('I change the candidate status to {string} to get access to {string} button', (InitialStatus:string) => {
    changeStatusDataUtils.changeStatusToWithAPI(InitialStatus)
    cy.reload()
});

When('I click {string} button', (Action:string) => {
    // api.clickActionButton(Action)
    changeStatusActions.clickStatusButton(Action)
});

Then('I should see {string}', (respectivePage: string) => {
    changeStatusAssertion.statusChangePageAssertion(respectivePage)
});
