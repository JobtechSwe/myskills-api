import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import { taxonomy, skill } from './__fixtures__/taxonomy'
import config from '../../lib/config'
import redis from '../../lib/adapters/redis'

const GET_FROM_TAXONOMY = gql`
  query taxonomy($limit: Int, $offset: Int, $taxonomyType: TaxonomyType) {
    taxonomy(params: { limit: $limit, offset: $offset, type: $taxonomyType }) {
      search {
        limit
        offset
      }
      total
      result {
        conceptId
        term
        type
      }
    }
  }
`

describe('taxonomy', () => {
  let query: Function
  let mydata: { getData: any; saveData: any }

  const queryVars = {
    offset: 0,
    limit: 10,
    taxonomyType: 'skill',
  }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query } = getClient(server, {
      context: {
        mydata,
      },
    }))
  })

  it('should get all within limit from taxonomy', async () => {
    const { taxonomyType, ...rest } = queryVars
    const { data } = await query({
      query: GET_FROM_TAXONOMY,
      variables: rest,
    })

    expect(data.taxonomy).toMatchObject(taxonomy)
  })

  it('should be able to filter by taxonomy type', async () => {
    const { data } = await query({
      query: GET_FROM_TAXONOMY,
      variables: queryVars,
    })
    expect(data.taxonomy).toMatchObject(skill)
  })

  describe('redis cache taxonomy calls', () => {
    beforeEach(() => redis.flushall())

    it('should cache requests', async () => {
      await query({
        query: GET_FROM_TAXONOMY,
        variables: queryVars,
      })
      const queryURL = `httpcache:${config.TAXONOMY_URL_BASE}${
        config.TAXONOMY_URL_PATH
      }?offset=${queryVars.offset}&limit=${queryVars.limit}&type=${
        queryVars.taxonomyType
      }`
      const cacheInstance = await redis.get(queryURL)
      expect(typeof cacheInstance).toBe('string')
    })
  })
})
