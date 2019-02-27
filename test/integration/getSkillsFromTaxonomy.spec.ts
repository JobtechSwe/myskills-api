import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import { skills } from './__fixtures__/taxonomy'

const GET_SKILLS_FROM_TAXONOMY = gql`
  query getSkillsFromTaxonomy($limit: Int, $offset: Int) {
    getSkillsFromTaxonomy(params: { limit: $limit, offset: $offset }) {
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

describe('getSkillsFromTaxonomy', () => {
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
  it('should get skills from taxonomy', async () => {
    const response = await query({
      query: GET_SKILLS_FROM_TAXONOMY,
      variables: { offset: 0, limit: 10 },
    })
    const { data } = response

    expect(data.getSkillsFromTaxonomy).toMatchObject(skills)
  })
})
