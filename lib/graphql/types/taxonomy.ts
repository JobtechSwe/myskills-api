import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum Type {
    skill
  }

  type Search {
    offset: Int
    limit: Int
  }

  input TaxonomyQueryInput {
    offset: Int
    limit: Int
    q: String
    type: Type
  }

  interface TaxonomyResponse {
    search: Search!
    total: Int
  }

  type SkillsFromTaxonomy {
    conceptId: String
    term: String
    type: String
  }

  type TaxonomySkillsResponse implements TaxonomyResponse {
    search: Search!
    total: Int
    result: [SkillsFromTaxonomy]!
  }
`
