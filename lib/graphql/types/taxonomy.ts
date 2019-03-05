import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum TaxonomyType {
    COUNTY
    EDUCATION_FIELD_1
    EDUCATION_FIELD_2
    EDUCATION_FIELD_3
    EDUCATION_LEVEL_1
    EDUCATION_LEVEL_2
    EDUCATION_LEVEL_3
    LANGUAGE
    MUNICIPALITY
    OCCUPATION_FIELD
    OCCUPATION_GROUP
    OCCUPATION_NAME
    SKILL
    WORKTIME_EXTENT
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
