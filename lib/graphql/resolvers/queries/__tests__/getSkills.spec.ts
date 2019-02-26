import { getSkills } from '../getSkills'

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

test('gets data from mydata', async () => {
  await getSkills({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'skills',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getSkills({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
