import schema from '../schema'

test('exports resolvers and type definitions', () => {
  expect(schema).toEqual({
    resolvers: expect.any(Object),
    typeDefs: expect.any(Object),
  })
})
