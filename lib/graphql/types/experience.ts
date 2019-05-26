import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input ExperienceInput {
    sourceId: String
    term: String!
    start: String!
    employer: String!
    end: String
  }

  type Experience {
    id: String!
    employer: String!
    sourceId: String
    term: String!
    start: String!
    end: String
  }

  input EditExperienceInput {
    id: String!
    employer: String!
    sourceId: String
    term: String!
    start: String!
    end: String
  }
`
