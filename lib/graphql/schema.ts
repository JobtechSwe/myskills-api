import { GraphQLDate } from 'graphql-iso-date'
import jsonType from 'graphql-type-json'
import { merge } from 'lodash'
import resolvers from './resolvers'
import typeDefs from './types'
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

const result = {
  TaxonomyResult: {
    __resolveType(obj: any) {
      if (obj.type === 'skill') {
        return 'TaxonomySkillResult'
      }

      return 'TaxonomyDefaultResult'
    },
  },
}

const customScalarResolvers = {
  GraphQLDate,
  GraphQLEmail,
  GraphQLUUID,
  JSON: jsonType,
  Password: new GraphQLPassword(8),
}

export default {
  resolvers: merge(resolvers, customScalarResolvers, result),
  typeDefs: [customScalarSchema, ...typeDefs],
}
