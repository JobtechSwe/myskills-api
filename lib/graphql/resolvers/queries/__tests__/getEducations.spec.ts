import { getEducations } from '../getEducations'
import { ctx } from '../../__mocks__/apolloServerContext'

test('gets data from mydata', async () => {
  await getEducations({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'educations',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getEducations({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
