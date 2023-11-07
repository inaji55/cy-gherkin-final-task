class ChangeStatus{
    respectivePag:string
    constructor() {
        this.respectivePag = '.orangehrm-background-container'

    }

    get respectivePage(){
        return cy.get(this.respectivePag)
    }

}

const changeStatusObj = new ChangeStatus()

export default changeStatusObj
