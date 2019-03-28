import { ctx } from '../../../__mocks__/apolloServerContext'
import { addEducation } from '../addEducation'

const args = {
  education: {
    taxonomyId: '1',
    name: 'Librarian',
  },
}

test('save input in mydata', async () => {
  await addEducation({}, args, ctx as any, {} as any)

  expect(ctx.mydata.saveDataList).toHaveBeenCalledWith({
    area: 'educations',
    data: { id: expect.any(String), ...args.education },
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = { id: '34234jkl234', ...args.education }

  ctx.mydata.saveDataList.mockResolvedValue(result)

  await expect(addEducation({}, args, ctx as any, {} as any)).resolves.toEqual(
    result
  )
})

test('handles errors', async () => {
  ctx.mydata.saveDataList.mockRejectedValue('err')

  await expect(addEducation({}, args, ctx as any, {} as any)).rejects.toThrow(
    'err'
  )
})
