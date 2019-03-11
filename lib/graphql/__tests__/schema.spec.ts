import schema from '../schema'

test('exports resolvers and type definitions', () => {
  expect(schema).toEqual({
    resolvers: expect.any(Object),
    typeDefs: expect.any(Object),
  })
})

test('taxonomyResult resolves TaxonomySkillResult if type is skill', () => {
  const result = schema.resolvers.TaxonomyResult.__resolveType({
    type: 'skill',
  })

  expect(result).toEqual('TaxonomySkillResult')
})

test('taxonomyResult defaults to TaxonomyDefaultResult', () => {
  const result = schema.resolvers.TaxonomyResult.__resolveType({
    type: 'anyType',
  })

  expect(result).toEqual('TaxonomyDefaultResult')
})
