import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Trivia {
    info: String
    source: String
  }
`
