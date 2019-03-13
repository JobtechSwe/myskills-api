import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input SkillInput {
    taxonomyId: String!
    term: String!
    type: String!
  }

  type Skill {
    id: String!
    taxonomyId: String!
    term: String!
    type: String!
  }
`
