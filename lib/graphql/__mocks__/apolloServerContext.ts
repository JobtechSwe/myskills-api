import TaxonomyAPI from '../../adapters/taxonomy'
jest.mock('../../adapters/taxonomy')

export const ctx = {
  headers: {
    token: 'token',
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
  },
}
