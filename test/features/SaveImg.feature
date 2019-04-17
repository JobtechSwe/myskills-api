Feature: Save Image
    # "I" in the context is the developer that consumes the API
    Scenario: Upload image
        Given I have a bearer token
        When I save the image "person-small"
        Then I will receive the image that has been stored by this operation
        And When I query for it I will receive the image as base64 string
    Scenario: Upload large image
        Given I have a bearer token
        When I save an image that is larger than 800x600: "otherperson-large"
        Then I will receive the cropped image that has been stored by this operation
        And I will see the picture under the picture section