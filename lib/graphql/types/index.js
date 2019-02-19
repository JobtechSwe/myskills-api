const reqdir = require('require-dir')
const types = reqdir('./')
const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Login {
    id: String!
    expires: String!
  }

  enum Language {
    spanish
    swedish
  }

  type Mutation {
    """
    Login an existing user
    """
    login: Login

    """
    Add languages
    """
    addLanguage(language: Language!): [Language]!
  }

  type Query {
    """
    Get languages
    """
    getLanguages: [Language!]!
  }
`

module.exports = [...Object.values(types), typeDefs]
