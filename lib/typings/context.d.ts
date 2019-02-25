import { getData, saveData } from '../adapters/mydata'

export interface IApolloServerContext {
  headers: {
    token: string
  }
  mydata: {
    getData: typeof getData
    saveData: typeof saveData
  }
}
