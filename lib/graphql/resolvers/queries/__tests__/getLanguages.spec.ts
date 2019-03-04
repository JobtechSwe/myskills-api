import { getLanguages } from '../getLanguages'
import { ctx } from '../../__mocks__/apolloServerContext'

test('gets data from mydata', async () => {
  await getLanguages({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'languages',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getLanguages({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
