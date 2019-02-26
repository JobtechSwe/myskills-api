import dotenv from 'dotenv'
import _ from 'lodash'

dotenv.config()

const defaults = {
  DOMAIN: 'http://localhost:3000',
  REDIS_API_HOST: 'localhost',
  REDIS_API_PORT: 6380,
  REDIS_API_PASSWORD: undefined,
  SERVER_PORT: 3000,
}

const config = _.pick({ ...defaults, ...process.env }, [
  'DOMAIN',
  'REDIS_API_HOST',
  'REDIS_API_PORT',
  'REDIS_API_PASSWORD',
  'SERVER_PORT',
])

export default config
