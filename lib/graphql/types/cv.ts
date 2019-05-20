import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CVInput {
    skills: [SkillInput!]
    educations: [EducationInput!]
    experiences: [ExperienceInput!]
    image: ImgInput
    occupation: OccupationInput
    traits: [String!]
    personalDescription: String
  }

  type CV {
    skills: [Skill]
    educations: [Education]
    experiences: [Experience]
    image: String
    occupation: Occupation
    traits: [String!]
    personalDescription: String
  }
`
