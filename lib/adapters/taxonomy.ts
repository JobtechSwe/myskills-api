import got from 'got'
import { TaxonomyQueryInput } from '../__generated__/myskills'

const BASE_URL = 'https://sokannonser.dev.services.jtech.se'

export async function get<T = any>(query: TaxonomyQueryInput): Promise<T> {
  const { body } = await got('/vf/search', {
    baseUrl: BASE_URL,
    headers: {
      'api-key': 'apa',
    },
    json: true,
    query,
  })

  return body
}
