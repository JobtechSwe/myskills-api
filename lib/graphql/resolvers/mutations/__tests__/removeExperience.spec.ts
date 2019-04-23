import { removeExperience } from '../removeExperience'
import { ctx } from '../../../__mocks__/apolloServerContext'

const args = {
  id: 'someExperienceId',
}

test('removes single experience in mydata', async () => {
  await removeExperience({} as any, args, ctx as any, {} as any)

  expect(ctx.mydata.removeData).toHaveBeenCalledWith({
    area: 'experiences',
    token: 'token',
    id: args.id,
  })
})

test('returns true on success', async () => {
  const result = true

  ctx.mydata.removeData.mockResolvedValue(result)

  await expect(
    removeExperience({} as any, args, ctx as any, {} as any)
  ).resolves.toEqual(true)
})

test('handles errors', async () => {
  ctx.mydata.removeData.mockRejectedValue('err')

  await expect(
    removeExperience({} as any, args, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
