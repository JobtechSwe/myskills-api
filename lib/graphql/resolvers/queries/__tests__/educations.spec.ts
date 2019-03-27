import { ctx } from '../../../__mocks__/apolloServerContext'
import { educations } from '../educations'

test('gets data from mydata', async () => {
  await educations({}, {}, ctx as any, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'educations',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(educations({}, {}, ctx as any, {} as any)).rejects.toThrow('err')
})
