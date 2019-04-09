import { removeEducation } from '../removeEducation'
import { ctx } from '../../../__mocks__/apolloServerContext'

const args = {
  id: 'someEducationId',
}

test('removes single education in mydata', async () => {
  await removeEducation({} as any, args, ctx as any, {} as any)

  expect(ctx.mydata.removeData).toHaveBeenCalledWith({
    area: 'educations',
    token: 'token',
    id: args.id,
  })
})

test('returns true on success', async () => {
  const result = true

  ctx.mydata.removeData.mockResolvedValue(result)

  await expect(
    removeEducation({} as any, args, ctx as any, {} as any)
  ).resolves.toEqual(true)
})

test('handles errors', async () => {
  ctx.mydata.removeData.mockRejectedValue('err')

  await expect(
    removeEducation({} as any, args, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
