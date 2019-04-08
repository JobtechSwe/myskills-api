import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ExperienceInput {
    taxonomyId: String!
    term: String
    years: String!
  }

  type Experience {
    id: String!
    taxonomyId: String!
    term: String
    years: String!
  }
`
