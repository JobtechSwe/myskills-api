import { addEducation } from '../addEducation'

const args = {
  education: {
    id: '1',
    name: 'Librarian',
  },
}

const ctx = {
  headers: {
    token: 'token',
  },
  mydata: {
    consents: {} as any,
    getData: jest.fn(),
    saveData: jest.fn(),
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
