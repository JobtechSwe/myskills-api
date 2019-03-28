import {
  consents,
  getData,
  removeData,
  saveData,
  saveDataList,
} from '../adapters/mydata'
import TaxonomyAPI from '../adapters/taxonomy'
import OntologyAPI from '../adapters/ontology'
import { Request } from 'express'

export interface ApolloServerContext {
  req: Request
  mydata: {
    consents: typeof consents
    getData: typeof getData
    saveData: typeof saveData
    saveDataList: typeof saveDataList
    removeData: typeof removeData
  }
  dataSources: {
    taxonomyAPI: TaxonomyAPI
    ontologyAPI: OntologyAPI
  }
}
