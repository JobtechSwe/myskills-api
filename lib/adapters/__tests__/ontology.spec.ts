import { RESTDataSource } from 'apollo-datasource-rest'
jest.mock('apollo-datasource-rest')
import config from '../../config'

import OntologyAPI from '../ontology'

describe('OntologyAPI', () => {
  let ontology: OntologyAPI
  let mockRESTDataSourceInstance: { get: any; post: any }

  beforeEach(() => {
    ;(RESTDataSource as jest.Mock).mockClear()
    ontology = new OntologyAPI()
    mockRESTDataSourceInstance = (RESTDataSource as jest.Mock).mock.instances[0]
  })

  describe('#getData', () => {
    test('should send query with params', async () => {
      mockRESTDataSourceInstance.get.mockResolvedValue({
        hej: 'hej',
      })

      const query = {}
      const result = await ontology.getData('some/path', query)

      expect(mockRESTDataSourceInstance.get).toHaveBeenCalledWith(
        `${config.ONTOLOGY__URL_PATH}/some/path`,
        new URLSearchParams(),
        expect.any(Object)
      )
      expect(result).toEqual({ hej: 'hej' })
    })

    test('that it rejects error', async () => {
      mockRESTDataSourceInstance.get.mockImplementation(() => {
        throw new Error('someError')
      })
      const query = {}
      await expect(ontology.getData('some/path', query)).rejects.toThrow(
        'Error: someError'
      )
    })
  })

  describe('#postData', () => {
    test('should send query with params', async () => {
      mockRESTDataSourceInstance.post.mockResolvedValue({
        hej: 'hej',
      })

      const query = {
        body: 'someBody',
      }
      const result = await ontology.postData('some/path', query)

      expect(mockRESTDataSourceInstance.post).toHaveBeenCalledWith(
        `${config.ONTOLOGY__URL_PATH}/some/path`,
        query.body,
        expect.any(Object)
      )
      expect(result).toEqual({ hej: 'hej' })
    })

    test('that it rejects error', async () => {
      mockRESTDataSourceInstance.post.mockImplementation(() => {
        throw new Error('someError')
      })
      const query = {
        body: 'someBody',
      }
      await expect(ontology.postData('some/path', query)).rejects.toThrow(
        'Error: someError'
      )
    })
  })

  describe('getUrlSearchParams', () => {
    test('should handle arrays', () => {
      const testObject = {
        'parent-id': ['some', 'parent'],
        offset: 10,
        q: '',
      }

      const result = ontology.getUrlSearchParams(testObject)
      expect(result.toString()).toEqual(
        'parent-id=some&parent-id=parent&offset=10'
      )
    })

    test('should work with empty objects', () => {
      const testObject = {}

      const result = ontology.getUrlSearchParams(testObject)
      expect(result.toString()).toBe('')
    })
  })
})
