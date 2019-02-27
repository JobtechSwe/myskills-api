import { create } from '@mydata/client'
import myConfig from '../config'
import keyValueStore from '../services/keyValueStore'
import { Area } from '../types'

const config = {
  clientId: myConfig.DOMAIN,
  clientKeys: {
    privateKey:
      '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQDHKt4EE+WaaA6+9xuR60KbL7gfn7IEKnSrXyDOZCSwe5pqDlMM\naA/mxiK7wvmyBwZrUBPkrnWIy7WDoxF9x56D8NqBO/szYSJURTgQdmhpTKM1s7LC\naqn4QLw3ZGRnkvEnyY6NVY6M8QPokFY4zJlNvlp8NWdHGNad/jmXIZKjpwIDAQAB\nAoGAZSKYcJul6N1UN5aFcnhzbxgxOCXAoKrqaac5onRpyRBK3fX+J/ujr30HYC7m\n2ocEtHOKVoJcfqVqu7iPhj5aeCD9iKl9vtspMF3El4PDsq4i3R7pM+gajOWk6vhV\nooFtXD/EwbscwmcVwxS19JHE1q/QDNKuPOMcAmjzYmIfVeECQQD4AZ9otmTcPUoI\nMO+RZztC2V+HqV+W7lL6b7S1sfUJmWj/nqdWEeNrSMGqPd59j0Li2dsssd1RNuSR\nGsiOBLcxAkEAzZZCfVEgoz/E+aBK3rfZ5A1l8IpCs1/pfZQxSSSo5jFWwvmt83+K\n/ez7oeCeQFndSCVt2ZVsWqb3eX3UjqoCVwJABgwUFPuNjgk4iuaWkNcRjNm8CJTK\nreV1xIGAyIVkUi2Zb9Iwhlq9TtphToNfr3QUz288duSHXvmVrSwYA859oQJBAKsr\n3nREpe4GXFSTF4NUhECSvzuFgn+i7d83Ecoakd4HWnvAMws4OFuvgtuHD3v41nsJ\nXur4tFzOA+LN17po5sUCQFJbubbpJDp70dyJ8XlJTbXvFMJtTbs3dy8n5dmzXwCa\nU1/LgYCwvPycA5NAPzE42fHWjbZkNvRamMQRlBX8Nl0=\n-----END RSA PRIVATE KEY-----\n',
    publicKey:
      '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAMcq3gQT5ZpoDr73G5HrQpsvuB+fsgQqdKtfIM5kJLB7mmoOUwxoD+bG\nIrvC+bIHBmtQE+SudYjLtYOjEX3HnoPw2oE7+zNhIlRFOBB2aGlMozWzssJqqfhA\nvDdkZGeS8SfJjo1VjozxA+iQVjjMmU2+Wnw1Z0cY1p3+OZchkqOnAgMBAAE=\n-----END RSA PUBLIC KEY-----\n',
  },
  description: 'store mySkills',
  displayName: 'mySkills',
  eventsPath: '/events',
  jwksPath: '/jwks',
  keyValueStore,
  operator: myConfig.MYDATA_OPERATOR,
}

interface Config {
  area: Area
  domain: string
}

export interface DataInput {
  area: Area
  token: string
}

export interface SaveDataInput extends DataInput {
  data: object | string
}

const mydataOperator = create(config)
const createConfig = (area: Area): Config => ({
  area,
  domain: myConfig.DOMAIN,
})

async function getData<T = any>({ area, token }: DataInput): Promise<T> {
  const areaConfig = createConfig(area)
  const data = await mydataOperator.data.auth(token).read(areaConfig)
  return data[myConfig.DOMAIN][area].data
}

async function saveData<T = any[]>({
  area,
  data,
  token,
}: SaveDataInput): Promise<T[]> {
  const areaConfig = createConfig(area)
  const currentDataForDomainArea = await getData<any[]>({ area, token })
  const updatedData = {
    data: currentDataForDomainArea
      ? [...new Set([...currentDataForDomainArea, data])]
      : [data],
  }

  await mydataOperator.data
    .auth(token)
    .write({ ...areaConfig, data: updatedData })

  return updatedData.data
}

const { connect, consents, routes, events } = mydataOperator
export { connect, consents, getData, mydataOperator, saveData, routes, events }
