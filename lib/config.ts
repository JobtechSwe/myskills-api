import dotenv from 'dotenv'
dotenv.config()

import _ from 'lodash'

const defaults = {
  DOMAIN: 'http://localhost:3000',
  REDIS_API_HOST: 'localhost',
  REDIS_API_PORT: 6380,
  SERVER_PORT: 3000,
}

const config = _.pick({ ...defaults, ...process.env }, [
  'DOMAIN',
  'REDIS_API_HOST',
  'REDIS_API_PORT',
  'SERVER_PORT',
])

export default config
