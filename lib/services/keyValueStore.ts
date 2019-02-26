import redis from '../adapters/redis'

export const save = async (key: string, value: string, ttl?: number) => {
  await redis.set(key, value)

  if (typeof ttl === 'number') {
    await redis.expire(key, Math.round(ttl / 1000))
  } else {
    await redis.persist(key)
  }
}

export const load = (key: string) => redis.get(key)
export const remove = (key: string) => redis.del(key)

export default {
  load,
  remove,
  save,
}
