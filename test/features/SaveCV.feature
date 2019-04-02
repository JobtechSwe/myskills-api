# This feature allows a developer to send a complete CV to the API
Feature: Save CV
  # "I" in the context is the developer that consumes the API
  Scenario: Save CV for the first time
    Given I have a bearer token
      And I have this skills input:
      | taxonomyId   | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
      And I have this education input:
      | taxonomyId | name        |
      | 123456789  | High school |
      And I have this experience input:
      | taxonomyId  | name      | years |
      | taxonomyId1 | Carpenter | 29    |
     When I send the cv input to the save method
     Then I will receive the saved CV back
      And I will see the skills input under the skills section
      And I will see the education input under the educations section
      And I will see the experience input under the experiences section