import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import config from '../../lib/config'
import redis from '../../lib/adapters/redis'
import * as taxonomyFixture from './__fixtures__/taxonomy'

const GET_FROM_TAXONOMY = gql`
  query taxonomy($limit: Int, $offset: Int, $taxonomyType: TaxonomyType) {
    taxonomy(params: { limit: $limit, offset: $offset, type: $taxonomyType }) {
      search {
        limit
        offset
      }
      total
      result {
        taxonomyId
        term
        type
      }
    }
  }
`

describe('taxonomy', () => {
  let query: Function

  const queryVars = {
    offset: 0,
    limit: 10,
    taxonomyType: 'SKILL',
  }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query } = getClient(server))
  })

  it('should get all within limit from taxonomy', async () => {
    const { taxonomyType, ...rest } = queryVars
    const { data } = await query({
      query: GET_FROM_TAXONOMY,
      variables: rest,
    })

    expect(data.taxonomy).toEqual(taxonomyFixture.taxonomy)
  })

  describe('redis cache taxonomy calls', () => {
    beforeEach(async () => {
      const res = await redis.keys('httpcache:*')
      await redis.del(...res)
    })

    it('should cache requests', async () => {
      await query({
        query: GET_FROM_TAXONOMY,
        variables: queryVars,
      })
      const queryURL = `httpcache:${config.TAXONOMY_URL_BASE}${
        config.TAXONOMY_URL_PATH
      }?offset=${queryVars.offset}&limit=${
        queryVars.limit
      }&type=${queryVars.taxonomyType.toLowerCase()}`

      const cacheInstance = await redis.get(queryURL)
      expect(typeof cacheInstance).toBe('string')
    })
  })

  it.each`
    taxonomyType           | fixture
    ${'REGION'}            | ${taxonomyFixture.region}
    ${'EDUCATION_FIELD_1'} | ${taxonomyFixture.educationField1}
    ${'EDUCATION_FIELD_2'} | ${taxonomyFixture.educationField2}
    ${'EDUCATION_FIELD_3'} | ${taxonomyFixture.educationField3}
    ${'EDUCATION_LEVEL_1'} | ${taxonomyFixture.educationLevel1}
    ${'EDUCATION_LEVEL_2'} | ${taxonomyFixture.educationLevel2}
    ${'EDUCATION_LEVEL_3'} | ${taxonomyFixture.educationLevel3}
    ${'LANGUAGE'}          | ${taxonomyFixture.language}
    ${'MUNICIPALITY'}      | ${taxonomyFixture.municipality}
    ${'OCCUPATION_FIELD'}  | ${taxonomyFixture.occupationField}
    ${'OCCUPATION_GROUP'}  | ${taxonomyFixture.occupationGroup}
    ${'OCCUPATION_NAME'}   | ${taxonomyFixture.occupationName}
    ${'SKILL'}             | ${taxonomyFixture.skill}
    ${'WORKTIME_EXTENT'}   | ${taxonomyFixture.worktimeExtent}
  `(
    'should be able to filter by taxonomy type: $taxonomyType',
    async ({ taxonomyType, fixture }) => {
      const { data } = await query({
        query: GET_FROM_TAXONOMY,
        variables: { offset: 0, limit: 10, taxonomyType },
      })

      expect(data.taxonomy).toEqual(fixture)
    }
  )
})
