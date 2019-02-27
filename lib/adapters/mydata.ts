import { create } from '@mydata/client'
import myConfig from '../config'
import keyValueStore from '../services/keyValueStore'
import { Area } from '../types'

const config = {
  clientId: myConfig.DOMAIN,
  clientKeys: {
    privateKey: myConfig.MYDATA_OPERATOR_PRIVATE_KEY,
    publicKey: myConfig.MYDATA_OPERATOR_PUBLIC_KEY,
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
