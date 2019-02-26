import { retryStrategy } from '../redis'

describe('#retryStrategy', () => {
  test('should select the minimum retries', () => {
    expect(retryStrategy(10)).toEqual(500)
  })
})
