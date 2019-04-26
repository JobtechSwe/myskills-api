import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ExperienceInput {
    sourceId: String!
    term: String
    years: String!
  }

  type Experience {
    id: String!
    sourceId: String!
    term: String
    years: String!
  }
`
