import * as Constants from '../../support/constants'

class ChangeStatusActions {

    constructor() {

    }

    clickStatusButton(Action:string){
        cy.get('.oxd-form').find('.oxd-button').contains('button', Action).click({ force: true })

    }

}

const changeStatusActions = new ChangeStatusActions()
export { changeStatusActions };