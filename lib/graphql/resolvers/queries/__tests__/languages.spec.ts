import { ctx } from '../../../__mocks__/apolloServerContext'
import { languages } from '../languages'

test('gets data from mydata', async () => {
  await languages({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'languages',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(languages({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
