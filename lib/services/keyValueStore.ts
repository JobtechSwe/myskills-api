import redis from '../adapters/redis'

export async function save(key: string, value: string, ttl: number) {
  await redis.set(key, value)
  if (typeof ttl === 'number') {
    await redis.expire(key, Math.round(ttl / 1000))
  } else {
    await redis.persist(key)
  }
}

export async function load(key: string) {
  return redis.get(key)
}

export async function remove(key: string) {
  return redis.del(key)
}

export default {
  load,
  remove,
  save,
}
