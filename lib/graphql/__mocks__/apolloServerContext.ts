import TaxonomyAPI from '../../adapters/taxonomy'
import OntologyAPI from '../../adapters/ontology'
jest.mock('../../adapters/taxonomy')
jest.mock('../../adapters/ontology')

export const ctx = {
  req: {
    headers: {
      authorization: 'Bearer token',
    },
  },
  mydata: {
    consents: {
      request: jest.fn(),
    },
    getData: jest.fn(),
    saveData: jest.fn(),
    removeData: jest.fn(),
    saveDataList: jest.fn(),
  },
  dataSources: {
    taxonomyAPI: new TaxonomyAPI(),
    ontologyAPI: new OntologyAPI(),
  },
}
