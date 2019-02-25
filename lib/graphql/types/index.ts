import { gql } from 'apollo-server-express'
import reqdir from 'require-dir'
const types = reqdir('./')

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
    Add languages
    """
    addLanguage(language: Language!): [Language]!

    """
    Add experiences
    """
    addExperience(experience: ExperienceInput!): [Experience]!

    """
    Add education
    """
    addEducation(education: EducationInput!): [Education]!

    """
    Add skill
    """
    addSkill(skill: SkillInput!): [Skill]!
  }

  type Query {
    """
    Get languages
    """
    getLanguages: [Language!]!

    """
    Get educations
    """
    getEducations: [Education]!

    """
    Get experiences
    """
    getExperiences: [Experience]!

    """
    Get skills
    """
    getSkills: [Skill]!
  }
`
const typesTypedefs = [...Object.values(types)].map(
  (type: any) => type.typeDefs
)

export default [...typesTypedefs, typeDefs]
