import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input SkillInput {
    id: String!
    name: String
  }

  type Skill {
    id: String!
    name: String
  }
`
