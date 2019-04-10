import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Education {
    id: String!
    taxonomyId: String!
    term: String
  }

  input EducationInput {
    taxonomyId: String!
    term: String
  }
`
