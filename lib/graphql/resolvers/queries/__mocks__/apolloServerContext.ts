import TaxonomyAPI from '../../../../adapters/taxonomy'
jest.mock('../../../../adapters/taxonomy')

export const ctx = {
  headers: {
    token: 'token',
  },
  mydata: {
    consents: {} as any,
    getData: jest.fn(),
    saveData: jest.fn(),
  },
  dataSources: {
    taxonomyAPI: new TaxonomyAPI(),
  },
}
