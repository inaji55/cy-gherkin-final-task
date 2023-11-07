import * as Constants from '../../support/constants'

class CandidateAssertion {

    constructor() {

    }

    buttonsExistAssertionInCandidatePage(actions: string) {
        const actionsArray = actions.split(",");
        if (actionsArray[0] === "null") {
            cy.get('.oxd-form')
                .find('div[class="orangehrm-recruitment-actions"]')
                .should('be.empty');
        } else {
            actionsArray.forEach((status) => {
                this.buttonAssertionInsideRecord(status)
            });
        }
    }
    buttonAssertionInsideRecord(buttonContains: string) {
        return cy.get('.oxd-form')
            .find('.oxd-button')
            .contains('button', buttonContains)
            .should('be.visible');
    }

    statusAssertionInsideRecord(status: string) {
        const statusArr = status.split(" ")
        if(statusArr.length === 3){
            status = statusArr[0]+ " " +statusArr[1]
        }
        cy.get('.oxd-form').find('.oxd-text--subtitle-2').should('have.text', "Status: " + status)
    }

}

const candidateAssertion = new CandidateAssertion()
export { candidateAssertion };