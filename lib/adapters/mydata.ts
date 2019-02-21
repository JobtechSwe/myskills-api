import { connect, create, routes, events } from '@mydata/client'

import keyValueStore from '../services/keyValueStore'
import { DOMAIN } from '../config'

const config = {
  displayName: 'mySkills',
  description: 'store mySkills',
  clientId: DOMAIN,
  operator: 'http://localhost:4000',
  jwksPath: '/jwks',
  eventsPath: '/events',
  clientKeys: {
    publicKey:
      '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bG\nIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhA\nvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOnAgMBAAE=\n-----END RSA PUBLIC KEY-----\n',
    privateKey:
      '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQDHKt4EE+WaaA6+9xuR60KbL7gfn7IEKnSrXyDOZCSwe5pqDlMM\naA/mxiK7wvmyBwZrUBPkrnWIy7WDoxF9x56D8NqBO/szYSJURTgQdmhpTKM1s7LC\naqn4QLw3ZGRnkvEnyY6NVY6M8QPokFY4zJlNvlp8NWdHGNad/jmXIZKjpwIDAQAB\nAoGAZSKYcJul6N1UN5aFcnhzbxgxOCXAoKrqaac5onRpyRBK3fX+J/ujr30HYC7m\n2ocEtHOKVoJcfqVqu7iPhj5aeCD9iKl9vtspMF3El4PDsq4i3R7pM+gajOWk6vhV\nooFtXD/EwbscwmcVwxS19JHE1q/QDNKuPOMcAmjzYmIfVeECQQD4AZ9otmTcPUoI\nMO+RZztC2V+HqV+W7lL6b7S1sfUJmWj/nqdWEeNrSMGqPd59j0Li2dsssd1RNuSR\nGsiOBLcxAkEAzZZCfVEgoz/E+aBK3rfZ5A1l8IpCs1/pfZQxSSSo5jFWwvmt83+K\n/ez7oeCeQFndSCVt2ZVsWqb3eX3UjqoCVwJABgwUFPuNjgk4iuaWkNcRjNm8CJTK\nreV1xIGAyIVkUi2Zb9Iwhlq9TtphToNfr3QUz288duSHXvmVrSwYA859oQJBAKsr\n3nREpe4GXFSTF4NUhECSvzuFgn+i7d83Ecoakd4HWnvAMws4OFuvgtuHD3v41nsJ\nXur4tFzOA+LN17po5sUCQFJbubbpJDp70dyJ8XlJTbXvFMJtTbs3dy8n5dmzXwCa\nU1/LgYCwvPycA5NAPzE42fHWjbZkNvRamMQRlBX8Nl0=\n-----END RSA PRIVATE KEY-----\n',
  },
  keyValueStore,
}

const mydataOperator = create(config)
const createConfig = area => ({
  area,
  domain: config.DOMAIN,
})

async function getData({ area, token }: { area: string; token: string }) {
  const config = createConfig(area)
  const data = await mydataOperator.data.auth(token).read(config)
  return data[config.domain][area].data
}

async function saveData({
  area,
  data,
  token,
}: {
  area: string
  data: string
  token: string
}) {
  const config = createConfig(area)
  const allData = await mydataOperator.data.auth(token).read(config)
  const currentDataForDomainArea = allData[DOMAIN][area].data
  const updatedData = {
    data: currentDataForDomainArea
      ? [...new Set([...currentDataForDomainArea, data])]
      : [data],
  }

  await mydataOperator.data.auth(token).write({ ...config, data: updatedData })

  return updatedData.data
}

export { connect, getData, mydataOperator, saveData, routes, events }
