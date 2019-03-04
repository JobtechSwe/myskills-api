import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import { taxonomy, skill } from './__fixtures__/taxonomy'
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
    const { data } = await query({
      query: GET_FROM_TAXONOMY,
      variables: { offset: 0, limit: 10 },
    })

    expect(data.taxonomy).toMatchObject(taxonomy)
  })

  it('should be able to filter by taxonomy type', async () => {
    const { data } = await query({
      query: GET_FROM_TAXONOMY,
      variables: { offset: 0, limit: 10, taxonomyType: 'skill' },
    })
    expect(data.taxonomy).toMatchObject(skill)
  })

  describe('redis cache taxonomy calls', () => {
    beforeEach(() => redis.flushall())

    it('should cache requests', async () => {
      await query({
        query: GET_FROM_TAXONOMY,
        variables: { offset: 0, limit: 10, taxonomyType: 'skill' },
      })
      const cacheInstance = await redis.get(
        'httpcache:https://sokannonser.dev.services.jtech.se/vf/search?offset=0&limit=10&type=skill'
      )
      expect(typeof cacheInstance).toBe('string')
    })
  })
})
