import { ctx } from '../../../__mocks__/apolloServerContext'
import { skills } from '../skills'

test('gets data from mydata', async () => {
  await skills({}, {}, ctx as any, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'skills',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(skills({}, {}, ctx as any, {} as any)).rejects.toThrow('err')
})
