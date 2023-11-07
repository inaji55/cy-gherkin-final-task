import * as Constants from '../../support/constants'

class ChangeStatusAssertion {

    constructor() {

    }

    statusChangePageAssertion(respectivePage:string){
        cy.get('.orangehrm-background-container').contains(respectivePage).should('be.visible')

    }

}

const changeStatusAssertion = new ChangeStatusAssertion()
export { changeStatusAssertion };