import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ProfileInput {
    name: String!
    email: String!
    telephone: String
  }

  type Profile {
    name: String!
    email: String!
    telephone: String
  }
`
