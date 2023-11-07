Feature: Recruitment Process Status Flow
    Scenario Outline: Scenario Outline name: Checks whether a candidate with certain status can do certain actions
        Given common step: I open the OrangeHRM website
        And common step: I login as an Admin
        And I add a new Candidate with API
        And I open the Candidate
        And I change the candidate status to "<InitialStatus>" to get access to "<Action>" button
        When I click "<Action>" button
        Then I should see "<respectivePage>"

        Examples:
            | Action                | InitialStatus         | respectivePage        |
            | Shortlist             | Application Initiated | Shortlist Candidate   |
            | Reject                | Application Initiated | Reject Candidate      |
            | Schedule Interview    | Shortlisted           | Schedule Interview    |
            | Mark Interview Passed | Interview Scheduled   | Mark Interview Passed |
            | Mark Interview Failed | Interview Scheduled   | Mark Interview Failed |
            | Offer Job             | Interview Passed      | Offer Job             |
            | Offer Declined        | Job Offered           | Decline Offer         |
            | Hire                  | Job Offered           | Hire Candidate        |


