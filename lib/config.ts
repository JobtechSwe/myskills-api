import dotenv from 'dotenv'
import _ from 'lodash'

dotenv.config()

const defaults = {
  DOMAIN: `http://${process.env.DOMAIN_HOST}:${process.env.SERVER_PORT}`,
  MYDATA_OPERATOR: 'http://localhost:4000',
  MYDATA_OPERATOR_PRIVATE_KEY:
    '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQDHKt4EE+WaaA6+9xuR60KbL7gfn7IEKnSrXyDOZCSwe5pqDlMM\naA/mxiK7wvmyBwZrUBPkrnWIy7WDoxF9x56D8NqBO/szYSJURTgQdmhpTKM1s7LC\naqn4QLw3ZGRnkvEnyY6NVY6M8QPokFY4zJlNvlp8NWdHGNad/jmXIZKjpwIDAQAB\nAoGAZSKYcJul6N1UN5aFcnhzbxgxOCXAoKrqaac5onRpyRBK3fX+J/ujr30HYC7m\n2ocEtHOKVoJcfqVqu7iPhj5aeCD9iKl9vtspMF3El4PDsq4i3R7pM+gajOWk6vhV\nooFtXD/EwbscwmcVwxS19JHE1q/QDNKuPOMcAmjzYmIfVeECQQD4AZ9otmTcPUoI\nMO+RZztC2V+HqV+W7lL6b7S1sfUJmWj/nqdWEeNrSMGqPd59j0Li2dsssd1RNuSR\nGsiOBLcxAkEAzZZCfVEgoz/E+aBK3rfZ5A1l8IpCs1/pfZQxSSSo5jFWwvmt83+K\n/ez7oeCeQFndSCVt2ZVsWqb3eX3UjqoCVwJABgwUFPuNjgk4iuaWkNcRjNm8CJTK\nreV1xIGAyIVkUi2Zb9Iwhlq9TtphToNfr3QUz288duSHXvmVrSwYA859oQJBAKsr\n3nREpe4GXFSTF4NUhECSvzuFgn+i7d83Ecoakd4HWnvAMws4OFuvgtuHD3v41nsJ\nXur4tFzOA+LN17po5sUCQFJbubbpJDp70dyJ8XlJTbXvFMJtTbs3dy8n5dmzXwCa\nU1/LgYCwvPycA5NAPzE42fHWjbZkNvRamMQRlBX8Nl0=\n-----END RSA PRIVATE KEY-----\n',
  MYDATA_OPERATOR_PUBLIC_KEY:
    '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bG\nIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhA\nvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOnAgMBAAE=\n-----END RSA PUBLIC KEY-----\n',
  REDIS_API_HOST: 'localhost',
  REDIS_API_PORT: 6380,
  REDIS_API_PASSWORD: undefined,
  SERVER_PORT: 3000,
  TAXONOMY_URL_BASE: 'https://sokannonser.dev.services.jtech.se',
  TAXONOMY_URL_PATH: '/vf/search',
  TAXONOMY_API_KEY: 'apa',
}

const config = _.pick({ ...defaults, ...process.env }, [
  'DOMAIN',
  'MYDATA_OPERATOR',
  'MYDATA_OPERATOR_PRIVATE_KEY',
  'MYDATA_OPERATOR_PUBLIC_KEY',
  'REDIS_API_HOST',
  'REDIS_API_PORT',
  'REDIS_API_PASSWORD',
  'SERVER_PORT',
  'TAXONOMY_URL_BASE',
  'TAXONOMY_URL_PATH',
  'TAXONOMY_API_KEY',
])

export default config
