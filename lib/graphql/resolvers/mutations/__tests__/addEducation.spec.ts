import { addEducation } from '../addEducation'
import { ctx } from '../../../__mocks__/apolloServerContext'

const args = {
  education: {
    id: '1',
    name: 'Librarian',
  },
}

test('save input in mydata', async () => {
  await addEducation({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'educations',
    data: args.education,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [args.education]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addEducation({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addEducation({}, args, ctx, {} as any)).rejects.toThrow('err')
})
