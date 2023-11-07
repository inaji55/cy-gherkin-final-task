import * as Constants from '../../support/constants'
import candidateObj from '../Pages/CandidatePage'
class CandidateAssertion {

    constructor() {

    }

    buttonsExistAssertionInCandidatePage(actions: string) {
        const actionsArray = actions.split(",");
        if (actionsArray[0] === "null") {
            candidateObj.buttonDiv
            .should('be.empty');
        } else {
            actionsArray.forEach((status) => {
                this.buttonAssertionInsideRecord(status)
            });
        }
    }
    buttonAssertionInsideRecord(buttonContains: string) {
        return candidateObj.button
            .contains(buttonContains)
            .should('be.visible');
    }

    statusAssertionInsideRecord(status: string) {
        const statusArr = status.split(" ")
        if(statusArr.length === 3){
            status = statusArr[0]+ " " +statusArr[1]
        }
        candidateObj.status.should('have.text', "Status: " + status)
    }

}

const candidateAssertion = new CandidateAssertion()
export { candidateAssertion };