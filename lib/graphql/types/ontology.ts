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

  input OntologyRelatedInput {
    concept: [String!]
    uuid: [String!]
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
