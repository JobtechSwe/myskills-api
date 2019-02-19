const { merge } = require('lodash')
const resolvers = require('./resolvers')
const jsonType = require('graphql-type-json')
const { GraphQLDate } = require('graphql-iso-date')
const typeDefs = require('./types')

const {
  GraphQLEmail,
  GraphQLUUID,
  GraphQLPassword,
} = require('graphql-custom-types')

const customScalarSchema = `
  scalar JSON
  scalar GraphQLDate
  scalar GraphQLEmail
  scalar GraphQLUUID
  scalar Password
`

const customScalarResolvers = {
  JSON: jsonType,
  GraphQLDate,
  GraphQLEmail,
  GraphQLUUID,
  Password: new GraphQLPassword(8),
}

module.exports = {
  typeDefs: [customScalarSchema, ...typeDefs],
  resolvers: merge(resolvers, customScalarResolvers),
}
