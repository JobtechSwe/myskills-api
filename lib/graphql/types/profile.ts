import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ProfileInput {
    firstName: String!
    lastName: String!
  }

  type Profile {
    firstName: String
    lastName: String
  }
`
