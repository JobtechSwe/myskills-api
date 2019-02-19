require('dotenv').config()

const defaults = {
  DOMAIN: 'http://localhost:3000',
  REDIS_API_HOST: 'localhost',
  REDIS_API_PORT: 6380,
  SERVER_PORT: 3000,
}

const { DOMAIN, REDIS_API_HOST, REDIS_API_PORT, SERVER_PORT } = Object.assign(
  defaults,
  process.env
)

module.exports = {
  DOMAIN,
  REDIS_API_HOST,
  REDIS_API_PORT,
  SERVER_PORT,
}
