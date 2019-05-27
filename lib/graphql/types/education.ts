import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Education {
    programme: String!
    degree: String
    school: String!
    start: String!
    end: String
    id: String!
  }

  input EditEducationInput {
    programme: String!
    degree: String
    school: String!
    start: String!
    end: String
    id: String!
  }

  input EducationInput {
    programme: String!
    degree: String
    school: String!
    start: String!
    end: String
  }
`
