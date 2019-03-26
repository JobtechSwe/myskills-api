import {
  consents,
  getData,
  removeData,
  saveData,
  saveDataList,
} from '../adapters/mydata'
import TaxonomyAPI from '../adapters/taxonomy'

export interface ApolloServerContext {
  token?: string
  mydata: {
    consents: typeof consents
    getData: typeof getData
    saveData: typeof saveData
    saveDataList: typeof saveDataList
    removeData: typeof removeData
  }
  dataSources: {
    taxonomyAPI: TaxonomyAPI
  }
}
