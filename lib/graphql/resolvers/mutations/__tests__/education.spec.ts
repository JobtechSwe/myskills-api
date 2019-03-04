import { ctx } from '../../../__mocks__/apolloServerContext'
import { education } from '../education'

const args = {
  education: {
    id: '1',
    name: 'Librarian',
  },
}

test('save input in mydata', async () => {
  await education({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'educations',
    data: [args.education],
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [args.education]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(education({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(education({}, args, ctx, {} as any)).rejects.toThrow('err')
})
