import { gql } from 'apollo-server-express'
import * as types from './typesIndex'

const typeDefs = gql`
  type Consent {
    id: String!
    url: String!
    expires: String!
  }

  type Login {
    url: String!
    sessionId: String!
  }

  enum Language {
    spanish
    swedish
  }

  type ConsentResponse {
    accessToken: String!
  }

  type Mutation {
    """
    Login an existing user
    """
    login: Login!

    """
    Add languages to user
    """
    addLanguage(language: Language!): Language!

    """
    Add experiences to user
    """
    addExperience(experience: ExperienceInput!): Experience!

    """
    Add education to user
    """
    addEducation(education: EducationInput!): Education!

    """
    Add user profile
    """
    createProfile(profile: ProfileInput!): Profile!

    """
    Add skill to user
    """
    addSkill(skill: SkillInput!): Skill!

    """
    Add user occupation
    """
    createOccupation(occupation: OccupationInput!): Occupation!

    """
    Add user trait
    """
    addTrait(trait: String!): String!

    """
    Add user description
    """
    addPersonalDescription(body: String!): String!
    """
    Remove skill from user
    """
    removeSkill(id: String!): Boolean!

    """
    Remove education from user
    """
    removeEducation(id: String!): Boolean!

    """
    Remove experience from user
    """
    removeExperience(id: String!): Boolean!

    """
    Remove language from user
    """
    removeLanguage(language: Language!): Boolean!

    """
    Save the complete cv to user
    """
    saveCV(cv: CVInput!): CV!

    """
    Save Image as base64 string
    """
    uploadImage(file: Upload!): ImgFile!
  }

  type Query {
    """
    Gets a consent request
    """
    consent: Consent!

    """
    Get user languages
    """
    languages: [Language!]!

    """
    Get user educations
    """
    educations: [Education]!

    """
    Get user experiences
    """
    experiences: [Experience]!

    """
    Get occupation
    """
    occupation: Occupation!

    """
    Get user profile
    """
    profile: Profile!

    """
    Get user skills
    """
    skills: [Skill]!

    """
    Get user image
    """
    image: String!

    """
    Get from taxonomy
    """
    taxonomy(params: TaxonomyQueryInput): TaxonomyResponse!

    """
    Get from ontology
    """
    ontologyConcepts(params: OntologyConceptsInput): [OntologyConceptResponse]!

    ontologyConcept(
      id: String!
      params: OntologyConceptInput
    ): OntologyConceptTermResponse!

    ontologyRelated(params: OntologyRelatedInput): OntologyRelatedResponse!

    ontologyTextParse(text: String!): [OntologyTextParseResponse]!
  }

  type Subscription {
    consentApproved(consentRequestId: String!): ConsentResponse!
    loginApproved(loginRequestId: String!): ConsentResponse!
  }
`

const typesTypedefs = [...Object.values(types)].map(
  (type: any) => type.typeDefs
)

export default [...typesTypedefs, typeDefs]
