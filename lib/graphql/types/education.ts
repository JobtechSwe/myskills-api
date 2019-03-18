import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Education {
    id: String!
    taxonomyId: String!
    name: String
  }

  input EducationInput {
    taxonomyId: String!
    name: String
  }
`
