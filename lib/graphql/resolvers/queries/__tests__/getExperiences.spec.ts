import { getExperiences } from '../getExperiences'

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
  await getExperiences({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'experiences',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getExperiences({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
