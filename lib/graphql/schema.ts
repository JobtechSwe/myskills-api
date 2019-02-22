import resolvers from './resolvers'
import jsonType from 'graphql-type-json'
import typeDefsz from './types'
import { GraphQLDate } from 'graphql-iso-date'
import { merge } from 'lodash'

import {
  GraphQLEmail,
  GraphQLUUID,
  GraphQLPassword,
} from 'graphql-custom-types'

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

export default {
  typeDefs: [customScalarSchema, ...typeDefsz],
  resolvers: merge(resolvers, customScalarResolvers),
}
