import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum TaxonomyType {
    skill
    municipality
  }

  type TaxonomySearch {
    offset: Int
    limit: Int
  }

  input TaxonomyQueryInput {
    offset: Int
    limit: Int
    q: String
    type: TaxonomyType
  }

  type TaxonomyResponse {
    search: TaxonomySearch!
    total: Int!
    result: [TaxonomyResult]!
  }

  interface TaxonomyResult {
    conceptId: String!
    term: String!
    type: String!
  }

  type TaxonomySkillResult implements TaxonomyResult {
    conceptId: String!
    term: String!
    type: String!
  }

  type TaxonomyDefaultResult implements TaxonomyResult {
    conceptId: String!
    term: String!
    type: String!
    parentId: String
  }
`
