import { addSkill } from '../addSkill'
import { ctx } from '../../__mocks__/apolloServerContext'

const args = {
  skill: {
    id: '2',
    name: 'Developer',
    conceptId: '',
    term: '',
    type: 'skill',
  },
}

test('save input in mydata', async () => {
  await addSkill({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'skills',
    data: args.skill,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [args.skill]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addSkill({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addSkill({}, args, ctx, {} as any)).rejects.toThrow('err')
})
