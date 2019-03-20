import { RESTDataSource } from 'apollo-datasource-rest'
import { TaxonomyQueryInput } from '../__generated__/myskills'
import config from '../config'

export default class TaxonomyAPI extends RESTDataSource {
  private path: string

  constructor() {
    super()
    this.baseURL = config.TAXONOMY_URL_BASE
    this.path = config.TAXONOMY_URL_PATH
  }

  willSendRequest(request: any) {
    const { params } = request

    for (const [name, value] of params) {
      if (name === 'parentId') {
        params.append('parent-id', value)
      }
    }
  }

  async getData<T = any>(query: TaxonomyQueryInput): Promise<T> {
    try {
      return this.get(
        this.path,
        {
          ...(<object>query),
        },
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
