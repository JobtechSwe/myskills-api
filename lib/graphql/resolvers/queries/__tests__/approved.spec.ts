// import { ctx } from '../../../__mocks__/apolloServerContext'
import { approved } from '../approved'
import { ctx } from '../../../__mocks__/apolloServerContext'
import redis from '../../../../adapters/redis'
jest.mock('../../../../adapters/redis')

test('gets data from mydata', async () => {
  ;(redis.get as jest.Mock).mockResolvedValue(
    JSON.stringify({ accessToken: 'someAccessToken' })
  )
  const result = await approved({}, { id: 'someId' }, ctx, {} as any)

  expect(result.accessToken).toEqual('someAccessToken')
})

test('handles errors', async () => {
  ;(redis.get as jest.Mock).mockResolvedValue(null)

  await expect(approved({}, { id: 'someid' }, ctx, {} as any)).rejects.toThrow(
    'Error: Cannot find approved consent'
  )
})
