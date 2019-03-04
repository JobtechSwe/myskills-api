import { getSkills } from '../getSkills'
import { ctx } from '../__mocks__/apolloServerContext'

test('gets data from mydata', async () => {
  await getSkills({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'skills',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getSkills({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
