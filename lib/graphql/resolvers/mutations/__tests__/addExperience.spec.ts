import { addExperience } from '../addExperience'

const args = {
  experience: {
    id: '1',
    name: 'Engineer',
    years: '1',
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
  await addExperience({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'experiences',
    data: args.experience,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [args.experience]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addExperience({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addExperience({}, args, ctx, {} as any)).rejects.toThrow('err')
})
