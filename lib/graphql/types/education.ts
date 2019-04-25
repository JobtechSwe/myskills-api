import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Education {
    programme: String!
    school: String!
    start: String!
    end: String
    id: String!
  }

  input EducationInput {
    programme: String!
    school: String!
    start: String!
    end: String
  }
`
