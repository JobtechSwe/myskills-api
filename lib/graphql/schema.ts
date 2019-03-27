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

const custom = {
  TaxonomyResult: {
    __resolveType(obj: any) {
      if (obj.type === 'skill') {
        return 'TaxonomySkillResult'
      }

      return 'TaxonomyDefaultResult'
    },
  },
  TaxonomyType: {
    REGION: 'region',
    EDUCATION_FIELD_1: 'sun-education-field-1',
    EDUCATION_FIELD_2: 'sun-education-field-2',
    EDUCATION_FIELD_3: 'sun-education-field-3',
    EDUCATION_LEVEL_1: 'sun-education-level-1',
    EDUCATION_LEVEL_2: 'sun-education-level-2',
    EDUCATION_LEVEL_3: 'sun-education-level-3',
    LANGUAGE: 'language',
    MUNICIPALITY: 'municipality',
    OCCUPATION_FIELD: 'occupation-field',
    OCCUPATION_GROUP: 'occupation-group',
    OCCUPATION_NAME: 'occupation-name',
    SKILL: 'skill',
    WORKTIME_EXTENT: 'worktime-extent',
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
  resolvers: merge(resolvers, customScalarResolvers, custom),
  typeDefs: [customScalarSchema, ...typeDefs],
}
