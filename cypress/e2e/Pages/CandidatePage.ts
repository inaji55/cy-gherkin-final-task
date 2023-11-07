class Candidate{

    form:string
    btnDiv:string
    btn:string
    statu:string

    constructor() {
        this.form = '.oxd-form'
        this.btnDiv = 'div[class="orangehrm-recruitment-actions"]'
        this.btn = 'button'
        this.statu = '.oxd-text--subtitle-2'

    }

    get button(){
        return this.buttonDiv
        .find(this.btn)
    }

    get buttonDiv(){
        return cy.get(this.form)
        .find(this.btnDiv)
    }

    get status(){
        return cy.get(this.form)
        .find(this.status)
    }

}

const candidateObj = new Candidate()

export default candidateObj