import { RESTDataSource } from 'apollo-datasource-rest'
import config from '../config'

export default class OntologyAPI extends RESTDataSource {
  private basePath: string

  constructor() {
    super()
    this.baseURL = config.ONTOLOGY__URL_BASE
    this.basePath = config.ONTOLOGY__URL_PATH
  }
  async getData<T = any>(path: string, query: object): Promise<T> {
    try {
      console.log('query', query)
      return this.get(
        `${this.basePath}/${path}`,
        { ...query },
        {
          headers: {
            'api-key': config.TAXONOMY_API_KEY,
          },
          cacheOptions: {
            ttl: 60 * 60 * 24 * 30, // 30 days
          },
        }
      )
    } catch (error) {
      console.log('Error fetching from taxonomy', error)
      throw new Error(error)
    }
  }
}
