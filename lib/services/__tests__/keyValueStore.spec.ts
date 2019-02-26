import redis from '../../adapters/redis'
import { save, load, remove } from '../keyValueStore'

jest.mock('../../adapters/redis')

const KEY = 'testKey'
const VALUE = 'testValue'

describe('#save', () => {
  test('sets a persisted value in the store', async () => {
    await save(KEY, VALUE)

    expect(redis.set).toHaveBeenCalledWith(KEY, VALUE)
    expect(redis.persist).toHaveBeenCalledWith(KEY)
  })

  test('sets a value with an expiry time', async () => {
    await save(KEY, VALUE, 3600)

    expect(redis.set).toHaveBeenCalledWith(KEY, VALUE)
    expect(redis.expire).toHaveBeenCalledWith(KEY, 4)
  })
})

describe('#load', () => {
  test('gets a value by key from the store', async () => {
    await load(KEY)

    expect(redis.get).toHaveBeenCalledWith(KEY)
  })
})

describe('#remove', () => {
  test('removes a value by key from the store', async () => {
    await remove(KEY)

    expect(redis.del).toHaveBeenCalledWith(KEY)
  })
})
