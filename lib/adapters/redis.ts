import Redis from 'ioredis'

const connectionString = process.env.REDIS || 'redis://localhost:6380/'

export const retryStrategy = (times: number) => {
  const maxReconnectTime = 50 * 1000
  return Math.min(times * 50, maxReconnectTime)
}

const redis = new Redis(connectionString, {
  retryStrategy,
})

export default redis
