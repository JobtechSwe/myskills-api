import { ctx } from '../../../__mocks__/apolloServerContext'
import { profile } from '../profile'

test('gets data from mydata', async () => {
  await profile({}, {}, ctx as any, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'profile',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(profile({}, {}, ctx as any, {} as any)).rejects.toThrow('err')
})
