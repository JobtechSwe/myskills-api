import got from 'got'
import { TaxonomyQueryInput } from '../__generated__/myskills'
import config from '../config'

export async function get<T = any>(query: TaxonomyQueryInput): Promise<T> {
  const { body } = await got(config.TAXONOMY_URL_PATH, {
    baseUrl: config.TAXONOMY_URL_BASE,
    headers: {
      'api-key': config.TAXONOMY_API_KEY,
    },
    json: true,
    query,
  })

  return body
}
