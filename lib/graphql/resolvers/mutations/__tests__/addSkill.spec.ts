import { ctx } from '../../../__mocks__/apolloServerContext'
import { addSkill } from '../addSkill'

const args = {
  skill: {
    taxonomyId: 'someTaxonomyId',
    term: '',
    type: 'skill',
  },
}

test('save input in mydata', async () => {
  await addSkill({} as any, args, ctx as any, {} as any)

  expect(ctx.mydata.saveDataList).toHaveBeenCalledWith({
    area: 'skills',
    data: { id: expect.any(String), ...args.skill },
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = { id: 'sas3224234234', ...args.skill }

  ctx.mydata.saveDataList.mockResolvedValue(result)

  await expect(
    addSkill({} as any, args, ctx as any, {} as any)
  ).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveDataList.mockRejectedValue('err')

  await expect(
    addSkill({} as any, args, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
