import { RESTDataSource } from 'apollo-datasource-rest'
import config from '../config'

export default class OntologyAPI extends RESTDataSource {
  private basePath: string

  constructor() {
    super()
    this.baseURL = config.ONTOLOGY__URL_BASE
    this.basePath = config.ONTOLOGY__URL_PATH
  }

  getUrlSearchParams(query: any): URLSearchParams {
    const params = new URLSearchParams(query)

    return [...params].reduce((prev, curr) => {
      curr[1].split(',').forEach(value => value && prev.append(curr[0], value))
      return prev
    }, new URLSearchParams())
  }

  async getData<T = any>(path: string, query: object): Promise<T> {
    try {
      return this.get(
        `${this.basePath}/${path}`,
        this.getUrlSearchParams(query),
        {
          headers: {
            'api-key': config.ONTOLOGY__API_KEY,
          },
          cacheOptions: {
            ttl: 60 * 60 * 24 * 30, // 30 days
          },
        }
      )
    } catch (error) {
      console.log('Error fetching from ontology', error)
      throw new Error(error)
    }
  }

  async postData<T = any>(path: string, query: any): Promise<T> {
    try {
      return this.post(`${this.basePath}/${path}`, query.body, {
        headers: {
          'content-type': 'text/plain',
        },
      })
    } catch (error) {
      console.log('Error posting to ontology')
      throw new Error(error)
    }
  }
}
