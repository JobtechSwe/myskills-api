import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest'
import config from '../config'
import { TaxonomyInputParams } from 'lib/graphql/resolvers/queries/taxonomy'
import { URLSearchParams } from 'apollo-env'

export default class TaxonomyAPI extends RESTDataSource {
  private path: string

  constructor() {
    super()
    this.baseURL = config.TAXONOMY_URL_BASE
    this.path = config.TAXONOMY_URL_PATH
  }

  adjustUrlSearchParams = (params: URLSearchParams) =>
    [...params.entries()].reduce(
      (acc: URLSearchParams, [prop, val]: string[]) => {
        if (prop === 'parent-id' && val.split(',').length > 1) {
          val.split(',').forEach((pId: string) => {
            acc.append('parent-id', pId)
          })
          return acc
        }

        acc.set(prop, val)
        return acc
      },
      new URLSearchParams()
    )

  willSendRequest(request: RequestOptions): void {
    request.params = this.adjustUrlSearchParams(
      request.params as URLSearchParams
    )
  }

  async getData<T = any>(query: TaxonomyInputParams): Promise<T> {
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
