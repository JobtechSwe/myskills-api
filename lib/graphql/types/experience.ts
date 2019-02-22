import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ExperienceInput {
    id: String!
    name: String
    years: String!
  }

  type Experience {
    id: String!
    name: String
    years: String!
  }
`
