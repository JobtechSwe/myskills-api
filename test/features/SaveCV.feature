# This feature allows a developer to send a complete CV to the API
Feature: Save CV
# "I" in the context is the developer that consumes the API
  Scenario: Save CV for the first time
    Given I have a bearer token
      And I have this skills input:
      | sourceId   | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
      And I have this education input:
      | programme | school        | start      |    end     |
      | Fotboll  | Gubbängsskolan | 1994-06-19 | 2001-08-08 |
      And I have this experience input:
      | sourceId  | term      | years |
      | sourceId1 | Carpenter | 29    |
     When I send the cv input to the save method
     Then I will receive back what has been stored by this operation
      And I will see the skills input under the skills section
      And I will see the education input under the educations section
      And I will see the experience input under the experiences section

  Scenario: Update the CV
    Given I have a bearer token
      And I have a stored CV with these skills:
      | sourceId   | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
      And I have this skills input:
      | sourceId   | term                    | type  |
      | GHGi_Ngg_1VZ | 2D-grafik-3D Corel Draw | skill |
     When I send the cv input to the save method
     Then I will receive back what has been stored by this operation
      And I will see these skills when I query for skills:
      | sourceId   | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
      | GHGi_Ngg_1VZ | 2D-grafik-3D Corel Draw | skill |

