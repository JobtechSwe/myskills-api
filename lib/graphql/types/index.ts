import { gql } from 'apollo-server-express'
import * as types from './typesIndex'

const typeDefs = gql`
  type Login {
    id: String!
    expires: String!
  }

  enum Language {
    spanish
    swedish
  }

  type Mutation {
    """
    Login an existing user
    """
    login: Login!

    """
    Add languages to user
    """
    addLanguage(language: Language!): [Language]!

    """
    Add experiences to user
    """
    addExperience(experience: ExperienceInput!): [Experience]!

    """
    Add education to user
    """
    addEducation(education: EducationInput!): [Education]!

    """
    Add user profile
    """
    createProfile(profile: ProfileInput!): Profile!

    """
    Add skill to user
    """
    addSkill(skill: SkillInput!): [Skill]!
  }

  type Query {
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
    Get user profile
    """
    profile: Profile!

    """
    Get user skills
    """
    skills: [Skill]!

    """
    Get from taxonomy
    """
    taxonomy(params: TaxonomyQueryInput): TaxonomyResponse!

    """
    Login an existing user
    """
    consent: Login!
  }
`

const typesTypedefs = [...Object.values(types)].map(
  (type: any) => type.typeDefs
)

export default [...typesTypedefs, typeDefs]
