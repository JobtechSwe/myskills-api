import { RESTDataSource } from 'apollo-datasource-rest'
import config from '../config'
import { URLSearchParams } from 'apollo-env'

export default class TaxonomyAPI extends RESTDataSource {
  private path: string

  constructor() {
    super()
    this.baseURL = config.TAXONOMY_URL_BASE
    this.path = config.TAXONOMY_URL_PATH
  }

  getUrlSearchParams(query: any): URLSearchParams {
    const strippedQuery = Object.keys(query).reduce(
      (prev: object, curr: string) =>
        query[curr] != null ? { ...prev, [curr]: query[curr] } : prev,
      {}
    )

    const params = new URLSearchParams(strippedQuery)

    return [...params].reduce((prev, curr) => {
      curr[1].split(',').forEach(value => value && prev.append(curr[0], value))
      return prev
    }, new URLSearchParams())
  }

  async getData<T = any>(query: object): Promise<T> {
    const params = this.getUrlSearchParams(query)

    try {
      return this.get(this.path, params, {
        headers: {
          'api-key': config.TAXONOMY_API_KEY,
        },
        cacheOptions: {
          ttl: 60 * 60 * 24 * 30, // 30 days
        },
      })
    } catch (error) {
      console.log('Error fetching from taxonomy', error)
      throw new Error(error)
    }
  }
}
