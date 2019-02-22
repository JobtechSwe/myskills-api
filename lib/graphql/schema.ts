import { GraphQLDate } from 'graphql-iso-date'
import jsonType from 'graphql-type-json'
import { merge } from 'lodash'
import resolvers from './resolvers'
import typeDefsz from './types'

import {
  GraphQLEmail,
  GraphQLPassword,
  GraphQLUUID,
} from 'graphql-custom-types'

const customScalarSchema = `
  scalar JSON
  scalar GraphQLDate
  scalar GraphQLEmail
  scalar GraphQLUUID
  scalar Password
`

const customScalarResolvers = {
  GraphQLDate,
  GraphQLEmail,
  GraphQLUUID,
  JSON: jsonType,
  Password: new GraphQLPassword(8),
}

export default {
  resolvers: merge(resolvers, customScalarResolvers),
  typeDefs: [customScalarSchema, ...typeDefsz],
}
