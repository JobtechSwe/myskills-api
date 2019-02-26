import { getData, saveData, consents } from '../adapters/mydata'

export interface ApolloServerContext {
  headers: {
    token: string
  }
  mydata: {
    consents: typeof consents
    getData: typeof getData
    saveData: typeof saveData
  }
}
