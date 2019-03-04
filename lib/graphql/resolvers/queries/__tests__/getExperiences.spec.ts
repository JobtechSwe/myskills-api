import { getExperiences } from '../getExperiences'
import { ctx } from '../../__mocks__/apolloServerContext'

test('gets data from mydata', async () => {
  await getExperiences({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'experiences',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getExperiences({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
