import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  input OccupationExperienceInput {
    years: Int!
  }

  type OccupationExperience {
    years: Int!
  }

  type Occupation {
    term: String!
    experience: OccupationExperience
  }

  input OccupationInput {
    term: String!
    experience: OccupationExperienceInput
  }
`
