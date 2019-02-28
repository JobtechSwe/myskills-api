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

  async getData<T = any>(query: TaxonomyQueryInput): Promise<T> {
    try {
      const { data } = await this.get('', {
        path: this.path,
        params: query,
        headers: {
          'api-key': config.TAXONOMY_API_KEY,
        },
      })

      return data
    } catch (error) {
      console.log('Error fetching from taxonomy')
      throw new Error(error)
    }
  }
}
