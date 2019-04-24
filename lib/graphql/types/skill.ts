import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input SkillInput {
    sourceId: String!
    term: String!
    type: String!
  }

  type Skill {
    sourceId: String!
    term: String!
    type: String!
    id: String!
  }
`
