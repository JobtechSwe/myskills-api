const reqdir = require('require-dir')
const types = reqdir('./')
const {
    gql
} = require('apollo-server-express')

const typeDefs = gql `
  type Login {
    id: String!
    expires: String!
  }

  type Mutation {
    """
    Login an existing user
    """
    login: Login

    """
    Add data
    """

  }

  type Query {
      info: String
  }
`

module.exports = [...Object.values(types), typeDefs]
