import { getData, saveData, consents } from '../adapters/mydata'
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
  }
  dataSources: {
    taxonomyAPI: TaxonomyAPI
  }
}
