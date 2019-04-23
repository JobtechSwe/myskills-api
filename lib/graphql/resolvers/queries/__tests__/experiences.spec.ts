import { ctx } from '../../../__mocks__/apolloServerContext'
import { experiences } from '../experiences'

test('gets data from mydata', async () => {
  await experiences({} as any, {}, ctx as any, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'experiences',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(
    experiences({} as any, {}, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
