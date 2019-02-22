import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Education {
    id: String!
    name: String
  }

  input EducationInput {
    id: String!
    name: String
  }
`
