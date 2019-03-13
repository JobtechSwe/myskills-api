import { ctx } from '../../../__mocks__/apolloServerContext'
import { addSkill } from '../addSkill'

const args = {
  skill: {
    name: 'Developer',
    taxonomyId: 'someTaxonomyId',
    term: '',
    type: 'skill',
  },
}

test('save input in mydata', async () => {
  await addSkill({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'skills',
    data: [{ id: expect.any(String), ...args.skill }],
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [{ id: 'sas3224234234', ...args.skill }]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addSkill({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addSkill({}, args, ctx, {} as any)).rejects.toThrow('err')
})
