import candidateObj from '../Pages/CandidatePage'

class ChangeStatusActions {

    constructor() {

    }

    clickStatusButton(Action:string){
        candidateObj.button
        .contains(Action)
        .click({ force: true })

    }

}

const changeStatusActions = new ChangeStatusActions()
export { changeStatusActions };