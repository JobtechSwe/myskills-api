import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CVInput {
    skills: [SkillInput!]
    educations: [EducationInput!]
    experiences: [ExperienceInput!]
  }

  type CV {
    skills: [Skill]
    educations: [Education]
    experiences: [Experience]
  }
`
