import { RESTDataSource } from 'apollo-datasource-rest'
jest.mock('apollo-datasource-rest')
import config from '../../config'

import TaxonomyAPI from '../taxonomy'

describe('TaxonomyAPI', () => {
  let taxonomy: TaxonomyAPI
  let mockRESTDataSourceInstance: { get: any }

  beforeEach(() => {
    ;(RESTDataSource as jest.Mock).mockClear()
    taxonomy = new TaxonomyAPI()
    mockRESTDataSourceInstance = (RESTDataSource as jest.Mock).mock.instances[0]
  })

  test('should send query with params', async () => {
    mockRESTDataSourceInstance.get.mockResolvedValue({
      hej: 'hej',
    })

    const query = {}
    const result = await taxonomy.getData(query)

    expect(mockRESTDataSourceInstance.get).toHaveBeenCalledWith(
      config.TAXONOMY_URL_PATH,
      query,
      expect.any(Object)
    )
    expect(result).toEqual({ hej: 'hej' })
  })

  test('that it rejects error', async () => {
    mockRESTDataSourceInstance.get.mockImplementation(() => {
      throw new Error('someError')
    })
    const query = {}
    await expect(taxonomy.getData(query)).rejects.toThrow('Error: someError')
  })

  describe('#TaxonomyAPI.adjustUrlSearchParams', () => {
    const params = new URLSearchParams()

    beforeEach(() => {
      params.set('limit', '10')
      params.set('parent-id', 'tWjg_Y7L_yXK,CSUf_ZVM_a7Z')
    })

    test('handles mutiple parent-id params', () => {
      const result = taxonomy.adjustUrlSearchParams(params)

      expect(result.getAll('parent-id').length).toEqual(2)
    })
  })
})
