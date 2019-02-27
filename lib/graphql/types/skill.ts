import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input SkillInput {
    conceptId: String!
    term: String!
    type: String!
  }

  type Skill {
    conceptId: String!
    term: String!
    type: String!
  }
`
