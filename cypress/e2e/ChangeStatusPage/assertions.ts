import changeStatusObj from '../Pages/ChangeStatusPage'

class ChangeStatusAssertion {

    constructor() {

    }

    statusChangePageAssertion(respectivePage:string){
        changeStatusObj.respectivePage.contains(respectivePage).should('be.visible')

    }

}

const changeStatusAssertion = new ChangeStatusAssertion()
export { changeStatusAssertion };