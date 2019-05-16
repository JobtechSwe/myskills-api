# This feature allows a developer to send a complete CV to the API
Feature: Save CV
  # "I" in the context is the developer that consumes the API
  Scenario: Save CV for the first time
    Given I have a bearer token
    And I have this skills input:
      | sourceId     | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
    And I have this education input:
      | programme | school         | start      | end        |
      | Fotboll   | Gubbängsskolan | 1994-06-19 | 2001-08-08 |
    And I have this experience input:
      | sourceId  | term      | employer          | start  | end    |
      | sourceId1 | Carpenter | Mimmis majbraseri | 201901 | 201902 |
    And I have this traits input:
      | trait |
      | Glad  |
      | Rolig |
    And I have personalDescription input "Jag e rolig o glad"
    And I have occupation input "Snickare"
    When I send the cv input to the save method
    Then I will receive back what has been stored by this operation
    And I will see the skills input under the skills section
    And I will see the education input under the educations section
    And I will see the experience input under the experiences section
    And I will see the traits input under the traits section
    And I will see the personalDescription input under the personalDescription section
    And I will see the occupation input under the occupations section

  Scenario: Update the CV
    Given I have a bearer token
    And I have a stored CV with these skills:
      | sourceId     | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
    And I have this skills input:
      | sourceId     | term                    | type  |
      | GHGi_Ngg_1VZ | 2D-grafik-3D Corel Draw | skill |
    When I send the cv input to the save method
    Then I will receive back what has been stored by this operation
    And I will see these skills when I query for skills:
      | sourceId     | term                    | type  |
      | FQAi_Nxv_4VZ | 3D-grafik-Autodesk Maya | skill |
      | GHGi_Ngg_1VZ | 2D-grafik-3D Corel Draw | skill |

