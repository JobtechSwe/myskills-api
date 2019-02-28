import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
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

    expect(data.taxonomy).toEqual(taxonomyFixture.taxonomy)
  })

  it.each`
    taxonomyType           | fixture
    ${'COUNTY'}            | ${taxonomyFixture.county}
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
