const { merge } = require('lodash')
import resolvers from './resolvers'
const jsonType = require('graphql-type-json')
const { GraphQLDate } = require('graphql-iso-date')
const typeDefsz = require('./types')

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
  typeDefs: [customScalarSchema, ...typeDefsz],
  resolvers: merge(resolvers, customScalarResolvers),
}
