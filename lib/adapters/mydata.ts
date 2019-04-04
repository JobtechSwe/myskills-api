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

export interface SaveDataInput<T> extends DataInput {
  data: T
}

export interface RemoveDataInput extends DataInput {
  id?: string
  key?: string
}

export const mydataOperator = create(config)

const createConfig = (area: Area): Config => ({
  area,
  domain: myConfig.DOMAIN,
})

export async function getData<T>({ area, token }: DataInput): Promise<T> {
  const areaConfig = createConfig(area)
  const data = await mydataOperator.data.auth(token).read(areaConfig)
  return data[myConfig.DOMAIN][area].data
}

export async function saveData<T>({
  area,
  data,
  token,
}: SaveDataInput<T>): Promise<T> {
  const areaConfig = createConfig(area)

  await mydataOperator.data.auth(token).write({ ...areaConfig, data: { data } })

  return data as T
}

export async function saveDataList<T>({
  area,
  data,
  token,
}: SaveDataInput<T>): Promise<T> {
  const areaConfig = createConfig(area)
  const currentDataForDomainArea = await getData<T[]>({ area, token })

  const updatedData = Array.isArray(currentDataForDomainArea)
    ? [...new Set([...currentDataForDomainArea, data])]
    : [data]

  await mydataOperator.data
    .auth(token)
    .write({ ...areaConfig, data: { data: updatedData } })

  return data as T
}

export async function removeData<T>({
  area,
  id: target,
  key = 'id',
  token,
}: RemoveDataInput): Promise<boolean> {
  const areaConfig = createConfig(area)

  const currentDataForDomainArea = await getData<T>({ area, token })

  const updatedData = {
    data: Array.isArray(currentDataForDomainArea)
      ? currentDataForDomainArea.filter(data =>
          key ? data[key] !== target : data !== target
        )
      : null,
  }

  await mydataOperator.data
    .auth(token)
    .write({ ...areaConfig, data: updatedData })

  return true
}

export const { connect, consents, routes, events } = mydataOperator
