import { login } from '../login'
import { defaultRequest } from '../../../../services/consents'

jest.mock('../../../../services/consents', () => ({
  defaultRequest: jest.fn(() => 'defaultRequest'),
}))

const ctx = {
  header: {
    token: 'token',
  },
  mydata: {
    consents: {
      request: jest.fn(),
    },
    getData: jest.fn(),
    saveData: jest.fn(),
  },
}

test('creates a consent request', async () => {
  await login({}, {}, ctx, {} as any)

  expect(defaultRequest).toHaveBeenCalledWith(2678400)
  expect(ctx.mydata.consents.request).toHaveBeenCalledWith('defaultRequest')
})

test('handles errors', async () => {
  ctx.mydata.consents.request.mockRejectedValue('err')

  await expect(login({}, {}, ctx, {} as any)).rejects.toThrow('err')
})
