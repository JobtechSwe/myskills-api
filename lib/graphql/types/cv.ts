import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input CVInput {
    skills: [SkillInput!]
    education: [EducationInput!]
    experience: [ExperienceInput!]
  }

  type CV {
    skills: [Skill]
    education: [Education]
    experience: [Experience]
  }
`
