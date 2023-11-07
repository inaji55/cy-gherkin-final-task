import * as Constants from '../../support/constants'

class ChangeStatusDataUtils {

    constructor() {

    }



    changeStatusToWithAPI(status: string) {

        switch (status) {
            case Constants.Status.Shortlisted:
                this.changeStatusToShortlistAPI()
                break;

            case Constants.Status.Rejected:
                this.changeStatusToRejectAPI()
                break;

            case Constants.Status.InterviewScheduled:
                this.changeStatusToScheduleInterviewAPI()
                break;

            case Constants.Status.InterviewPassed:
                this.changeStatusToInterViewPassAPI()
                break;
            case Constants.Status.InterviewPassed2:
                this.changeStatusToInterViewPassAPI2()
                break;

            case Constants.Status.InterviewFailed:
                this.changeStatusToInterViewFailAPI()
                break;

            case Constants.Status.JobOffered:
                this.changeStatusToOfferJobAPI()
                break;

            case Constants.Status.OfferDeclined:
                this.changeStatusToOfferDeclineAPI()
                break;

            case Constants.Status.Hired:
                this.changeStatusToHireAPI()
                break;


            default:
                break;
        }


    }

    getEmployeeIDforVacancy() {
        cy.request({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
            method: "GET",
        }).then((res) => {
            cy.wrap(res.body.data[0].empNumber).as("employeeID")
        })
    }

    getJobTitleID() {
        cy.request({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles",
            method: "GET",
        }).then((res) => {
            if (res.body.meta.total === 0) {
                this.addNewJobTitle()
            } else {

                cy.wrap(res.body.data[0].id).as("jobTitleID")
            }
        })
    }

    addNewJobTitle() {
        cy.request({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies",
            method: "POST",
            body: {
                description: "",
                note: "",
                specification: null,
                title: "QA Automation"
            }
        }).then((res) => {
            cy.wrap(res.body.data.id).as("jobTitleID")
        })
    }

    addNewVacancy() {
        this.getEmployeeIDforVacancy()
        this.getJobTitleID()
        cy.get("@employeeID").then((employeeID) => {
            cy.get('@jobTitleID').then((jobTitleID) => {
                cy.request({
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies",
                    method: "POST",
                    body: {
                        description: "",
                        employeeId: employeeID,
                        isPublished: true,
                        jobTitleId: jobTitleID,
                        name: "qaa",
                        numOfPositions: null,
                        status: true
                    }
                }).then((res) => {
                    cy.wrap(res.body.data.id).as("vacancyID")
                })
            })
        })
    }

    getVacancies() {
        cy.request({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies",
            method: "GET",
        }).then((res) => {
            if (res.body.meta.total === 0) {
                this.addNewVacancy()                // })
            } else {
                cy.wrap(res.body.data[0].id).as("vacancyID")
            }

        })
    }



    addCandidateAPI() {
        this.getVacancies()
        return cy.get('@vacancyID').then((vacancyID) => {
            cy.request({
                url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
                method: "POST",
                body: {
                    comment: null,
                    consentToKeepData: false,
                    contactNumber: null,
                    dateOfApplication: "2023-11-04",
                    email: "QA@QA.QA",
                    firstName: "Ibrahim",
                    keywords: null,
                    lastName: "Naji",
                    middleName: "Mahmoud",
                    vacancyId: vacancyID
                }
            })
                .then((res) => {
                    cy.wrap(res.body.data.id).as("candidateNum")
                })


        })
    }

    openCandidate() {
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/" + candidateNum)
            })
        })
    }

    changeStatusToShortlistAPI() {
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/shortlist",
                    method: "PUT",

                }).its("status")
                    .should("eql", 200);
            })
        })
    }

    getInterviewerID() {
        cy.request({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/interviewers",
            method: "GET",
        }).then((res) => {
            cy.wrap(res.body.data[0].empNumber).as("interviewerID")
        })
    }

    changeStatusToScheduleInterviewAPI() {
        this.changeStatusToShortlistAPI()
        this.getInterviewerID()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.get("@interviewerID").then((interviewerID) => {
                    cy.request({
                        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/shedule-interview",
                        method: "POST",
                        body: {
                            interviewDate: "2023-11-05",
                            interviewName: "a",
                            interviewTime: null,
                            interviewerEmpNumbers: [interviewerID],
                            note: null
                        }
                    }).then((res) => {
                        cy.wrap(res.body.data.id).as("interViewID")
                    })
                })
            })
        })
    }

    changeStatusToInterViewPassAPI() {
        this.changeStatusToScheduleInterviewAPI()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.get("@interViewID").then((interViewID) => {
                    cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/interviews/" + interViewID + "/pass",
                        method: "PUT",

                    }).its("status")
                        .should("eql", 200);
                })
            })
        })
    }

    changeStatusToInterViewPassAPI2(){
        this.changeStatusToInterViewPassAPI()
        this.getInterviewerID()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.get("@interviewerID").then((interviewerID) => {
                    cy.request({
                        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/shedule-interview",
                        method: "POST",
                        body: {
                            interviewDate: "2023-11-05",
                            interviewName: "a",
                            interviewTime: null,
                            interviewerEmpNumbers: [interviewerID],
                            note: null
                        }
                    }).then((res) => {
                        cy.wrap(res.body.data.id).as("interViewID")
                    })
                })
            })
        }).then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.get("@interViewID").then((interViewID) => {
                    cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/interviews/" + interViewID + "/pass",
                        method: "PUT",

                    }).its("status")
                        .should("eql", 200);
                })
            })
        })
    }

    changeStatusToInterViewFailAPI() {
        this.changeStatusToScheduleInterviewAPI()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.get("@interViewID").then((interViewID) => {
                    cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/interviews/" + interViewID + "/fail",
                        method: "PUT",
                    }).its("status")
                        .should("eql", 200);
                })
            })
        })
    }


    changeStatusToOfferJobAPI() {
        this.changeStatusToInterViewPassAPI()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/job/offer",
                    method: "PUT",

                }).its("status")
                    .should("eql", 200);
            })
        })
    }

    changeStatusToOfferDeclineAPI() {
        this.changeStatusToOfferJobAPI()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/job/decline",
                    method: "PUT",

                }).its("status")
                    .should("eql", 200);
            })
        })
    }

    changeStatusToHireAPI() {
        this.changeStatusToOfferJobAPI()
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/hire",
                    method: "PUT",

                }).its("status")
                    .should("eql", 200);
            })
        })
    }

    changeStatusToRejectAPI() {
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({ ///web/index.php/api/v2/recruitment/candidates/43/interviews/17/pass
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/" + candidateNum + "/reject",
                    method: "PUT",

                }).its("status")
                    .should("eql", 200);
            })
        })
    }

    deleteCandidateAPI() {
        return cy.then(() => {
            cy.get("@candidateNum").then((candidateNum) => {
                cy.request({
                    method: 'DELETE',
                    url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
                    body: {
                        ids: [candidateNum]
                    }
                })
            })
        })
    }

    addCandidate(Fname: string, Lname: string) {
        cy.wait(1000).then(() => {
            cy.get('.orangehrm-paper-container')
                .find('button')
                .contains('Add').click({ force: true })
                .then(() => {
                    cy.get('input[name="firstName"]').type(Fname)
                    cy.get('input[name="lastName"]').type(Lname)
                    cy.contains("label", 'Vacancy').parent().parent().find('.oxd-select-wrapper').click()
                        .then(() => {
                            cy.get('.oxd-select-dropdown').contains("QA").click();
                        })
                    cy.typeInsideBoxWithLabel("Email", 'QA@QA.QA')
                    cy.get('button[type="submit"]').click().then(() => {
                        cy.wait(1000)
                    })
                })
        })
    }

    openRecordWithName() {
        return cy.get('.oxd-table-body')
            .find('.oxd-table-cell')
            .contains("Ibrahim")
            .parent()
            .parent()
            .find('button')
            .eq(0)
            .click({ force: true })
    }

    searchRecruitment(field: string, value: string) {
        return cy.contains("label", field)
            .parent()
            .parent()
            .find('.oxd-select-wrapper').click().then(() => {
                cy.get('.oxd-select-dropdown').contains(value).click();
            }).then(() => {
                cy.intercept('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/**').as('searchRecruitment')
                cy.get('button').contains('Search').click();// click button command
                cy.wait('@searchRecruitment');
            })
    }

    navigateTo(pageName: string) {// custom command (nav to page and pass page names in enum)
        return cy.then(() => {
            cy.get('ul').find('li').contains(pageName).click().then(() => {
                cy.intercept('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/**').as('searchRecruitment')
                cy.wait('@searchRecruitment');
            }); // nav to func
        })
    }
}

const changeStatusDataUtils = new ChangeStatusDataUtils()
export { changeStatusDataUtils };