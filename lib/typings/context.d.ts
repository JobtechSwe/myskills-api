import { getData, saveData, consents } from '../adapters/mydata'

export interface IApolloServerContext {
  headers: {
    token: string
  }
  mydata: {
    consents: typeof consents
    getData: typeof getData
    saveData: typeof saveData
  }
}
