import { ctx } from '../../../__mocks__/apolloServerContext'
import { createProfile } from '../createProfile'

const args = {
  profile: {
    firstName: 'John',
    lastName: 'Doe',
  },
}

test('save input in mydata', async () => {
  await createProfile({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'profile',
    data: args.profile,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = args.profile

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(createProfile({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(createProfile({}, args, ctx, {} as any)).rejects.toThrow('err')
})
