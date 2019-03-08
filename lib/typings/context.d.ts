import { getData, saveData, removeData, consents } from '../adapters/mydata'
import TaxonomyAPI from '../adapters/taxonomy'
import { TaxonomyQueryInput } from 'lib/__generated__/myskills'

export interface ApolloServerContext {
  headers: {
    token: string
  }
  mydata: {
    consents: typeof consents
    getData: typeof getData
    saveData: typeof saveData
    removeData: typeof removeData
  }
  pubsub: any
  dataSources: {
    taxonomyAPI: TaxonomyAPI
  }
}
