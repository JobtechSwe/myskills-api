import { ctx } from '../../../__mocks__/apolloServerContext'
import { addExperience } from '../addExperience'

const args = {
  experience: {
    taxonomyId: '1',
    name: 'Engineer',
    years: '1',
  },
}

test('save input in mydata', async () => {
  await addExperience({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'experiences',
    data: [{ id: expect.any(String), ...args.experience }],
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [{ id: '234234', ...args.experience }]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addExperience({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addExperience({}, args, ctx, {} as any)).rejects.toThrow('err')
})
