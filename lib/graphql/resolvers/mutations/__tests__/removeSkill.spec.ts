import { removeSkill } from '../removeSkill'
import { Skill } from '../../../../__generated__/myskills'
import { ctx } from '../../../__mocks__/apolloServerContext'

const args = {
  id: 'someSkillId',
}

test('removes single skill in mydata', async () => {
  await removeSkill({} as any, args, ctx as any, {} as any)

  expect(ctx.mydata.removeData).toHaveBeenCalledWith({
    area: 'skills',
    token: 'token',
    id: args.id,
  })
})

test('returns true on success', async () => {
  const result = true

  ctx.mydata.removeData.mockResolvedValue(result)

  await expect(
    removeSkill({} as any, args, ctx as any, {} as any)
  ).resolves.toEqual(true)
})

test('handles errors', async () => {
  ctx.mydata.removeData.mockRejectedValue('err')

  await expect(
    removeSkill({} as any, args, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
