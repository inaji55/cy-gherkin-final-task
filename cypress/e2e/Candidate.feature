Feature: Recruitment Process Status Flow
    Scenario Outline: Scenario Outline name: Checks whether a candidate with certain status can do certain actions
        Given I open the OrangeHRM website
        And I login as an Admin
        And I add a new Candidate
        And I open the Candidate
        When I change the candidate status to "<Status>" using API
        Then I should see Status: "<Status>" in Application Stage
        And I should see "<Actions>" buttons in Application Stage

        Examples:
            | Status                | Actions                                            |
            | Application Initiated | Shortlist,Reject                                   |
            # | Shortlisted           | Schedule Interview,Reject                          |
            # | Interview Scheduled   | Mark Interview Passed,Mark Interview Failed,Reject |
            # | Interview Failed      | Reject                                             |
            # | Interview Passed      | Schedule Interview,Offer Job,Reject                |
            # | Interview Passed 2    | Offer Job,Reject                                   |
            # | Job Offered           | Hire,Offer Declined,Reject                         |
            # | Offer Declined        | Reject                                             |
            # | Rejected              | null                                               |
            # | Hired                 | null                                               |

