import { ctx } from '../../../__mocks__/apolloServerContext'
import { taxonomy } from '../taxonomy'
import { TaxonomyQueryArgs } from '../../../../__generated__/myskills'

test('passes query params to taxonomyAPI', async () => {
  const testArgs: TaxonomyQueryArgs = {
    params: {
      q: 'someQuery',
    },
  }

  await taxonomy({}, testArgs, ctx, {} as any)

  expect(ctx.dataSources.taxonomyAPI.getData).toHaveBeenCalledWith(
    testArgs.params
  )
})

test('handles errors', async () => {
  ;(ctx.dataSources.taxonomyAPI.getData as jest.Mock).mockRejectedValue('err')

  await expect(taxonomy({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
