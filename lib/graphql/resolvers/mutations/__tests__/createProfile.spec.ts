import { ctx } from '../../../__mocks__/apolloServerContext'
import { createProfile } from '../createProfile'

const args = {
  profile: {
    name: 'Lasse Kongo',
    email: 'lassekongo@example.com',
    telephone: '0123456789',
  },
}

test('save input in mydata', async () => {
  await createProfile({} as any, args, ctx as any, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'profile',
    data: args.profile,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = args.profile

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(
    createProfile({} as any, args, ctx as any, {} as any)
  ).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(
    createProfile({} as any, args, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
