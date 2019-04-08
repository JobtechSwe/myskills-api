import { consent } from '../consent'
import { defaultRequest } from '../../../../services/consents'
import { ctx } from '../../../__mocks__/apolloServerContext'

jest.mock('../../../../services/consents', () => ({
  defaultRequest: jest.fn(() => 'defaultRequest'),
}))

test('creates a consent request', async () => {
  await consent({}, {}, ctx as any, {} as any)

  expect(defaultRequest).toHaveBeenCalledWith(2678400)
  expect(ctx.mydata.consents.request).toHaveBeenCalledWith('defaultRequest')
})

test('handles errors', async () => {
  ctx.mydata.consents.request.mockRejectedValue('err')

  await expect(consent({}, {}, ctx as any, {} as any)).rejects.toThrow('err')
})