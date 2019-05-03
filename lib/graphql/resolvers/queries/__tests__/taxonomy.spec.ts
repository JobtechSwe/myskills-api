import { ctx } from '../../../__mocks__/apolloServerContext'
import { taxonomy } from '../taxonomy'
import { QueryTaxonomyArgs } from '../../../../__generated__/myskills'

beforeEach(() => {
  ;(ctx.dataSources.taxonomyAPI.getData as jest.Mock).mockResolvedValue({
    total: { value: 123 },
    result: [
      {
        conceptId: '123',
      },
      {
        conceptId: '456',
      },
    ],
  })
})

test('passes query params to taxonomyAPI without parentId', async () => {
  const testArgs: QueryTaxonomyArgs = {
    params: {
      q: 'someQuery',
    },
  }

  await taxonomy({} as any, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.taxonomyAPI.getData).toHaveBeenCalledWith({
    q: 'someQuery',
  })
})

test('passes query params to taxonomyAPI with parentId', async () => {
  const testArgs: QueryTaxonomyArgs = {
    params: {
      q: 'someQuery',
      parentId: ['123_abc'],
    },
  }

  await taxonomy({} as any, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.taxonomyAPI.getData).toHaveBeenCalledWith({
    q: 'someQuery',
    'parent-id': ['123_abc'],
  })
})

test('returnass formted result', async () => {
  const testArgs: QueryTaxonomyArgs = {
    params: {
      q: 'someQuery',
      parentId: ['123_abc'],
    },
  }

  const result = await taxonomy({} as any, testArgs, ctx as any, {} as any)

  expect(result).toEqual({
    result: [
      {
        conceptId: '123',
        taxonomyId: '123',
      },
      {
        conceptId: '456',
        taxonomyId: '456',
      },
    ],
    search: undefined,
    total: 123,
  })
})

test('handles errors', async () => {
  ;(ctx.dataSources.taxonomyAPI.getData as jest.Mock).mockRejectedValue('err')

  await expect(taxonomy({} as any, {}, ctx as any, {} as any)).rejects.toThrow(
    'err'
  )
})
