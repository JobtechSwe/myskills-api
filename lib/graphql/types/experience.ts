import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ExperienceInput {
    taxonomyId: String!
    name: String
    years: String!
  }

  type Experience {
    id: String!
    taxonomyId: String!
    name: String
    years: String!
  }
`
