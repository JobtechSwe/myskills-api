import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum OntologyType {
    SKILL
    OCCUPATION
    TRAIT
  }

  type OntologyTerm {
    name: String
    type: String
  }

  input OntologyConceptInput {
    type: OntologyType
    limit: Int
    offset: Int
  }

  input OntologyConceptTermInput {
    limit: Int
    offset: Int
  }

  type OntologyConceptResponse {
    id: String!
    name: String!
    type: OntologyType!
  }

  type OntologyConceptTermResponse {
    id: String!
    name: String!
    type: OntologyType!
    terms: [OntologyTerm]
  }
`
