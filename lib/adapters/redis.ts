import Redis from 'ioredis'
import config from '../config'

export const retryStrategy = (times: number) => {
  const maxReconnectTime = 50 * 1000
  return Math.min(times * 50, maxReconnectTime)
}

const redis = new Redis({
  host: config.REDIS_API_HOST,
  port: config.REDIS_API_PORT,
  password: config.REDIS_API_PASSWORD,
  retryStrategy,
})

export default redis
