import { getEducations } from '../getEducations'

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
  await getEducations({}, {}, ctx, {} as any)

  expect(ctx.mydata.getData).toHaveBeenCalledWith({
    area: 'educations',
    token: 'token',
  })
})

test('handles errors', async () => {
  ctx.mydata.getData.mockRejectedValue('err')

  await expect(getEducations({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
