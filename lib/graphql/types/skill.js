const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input SkillInput {
    id: String!
    name: String
  }

  type Skill {
    id: String!
    name: String
  }
`

module.exports = typeDefs
