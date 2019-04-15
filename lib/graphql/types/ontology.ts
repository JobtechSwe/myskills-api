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
    limit: Int
    offset: Int
  }

  input OntologyConceptsInput {
    type: OntologyType
    limit: Int
    offset: Int
    filter: String
  }

  input OntologyConceptTermInput {
    limit: Int
    offset: Int
  }

  input OntologyRelatedInput {
    concepts: [String!]
    id: [String!]
    limit: Int
    type: OntologyType!
  }

  type OntologyConceptResponse {
    id: String!
    name: String!
    type: OntologyType!
  }

  type OntologyRelationDetails {
    word2Vec: Float
  }

  type OntologyConceptTermResponse {
    id: String!
    name: String!
    type: OntologyType!
    terms: [OntologyTerm]
  }

  type OntologyTextParseResponse {
    id: String!
    name: String!
    type: OntologyType!
    terms: [String]!
  }

  type OntologyRelationResponse {
    id: String!
    name: String!
    type: OntologyType!
    score: Float!
    details: OntologyRelationDetails!
  }

  type OntologyRelatedResponse {
    count: Int!
    concepts: [OntologyConceptResponse]!
    relations: [OntologyRelationResponse]!
  }
`
