import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EDUCATIONS = gql`
  query educations {
    educations {
      name
    }
  }
`

const ADD_EDUCATION = gql`
  mutation addEducation($name: String!, $id: String!) {
    addEducation(education: { name: $name, id: $id }) {
      id
      name
    }
  }
`

describe('#educations', () => {
  let query: any
  let mutate: any

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  describe('addEducation', () => {
    it(`should be possible to add and get multiple education for user`, async () => {
      const {
        data: { addEducation },
      } = await mutate({
        mutation: ADD_EDUCATION,
        variables: {
          id: '123456789',
          name: 'High school',
        },
      })
      expect(addEducation[0].name).toBe('High school')

      await mutate({
        mutation: ADD_EDUCATION,
        variables: {
          id: '58',
          name: 'PhD',
        },
      })

      const { data } = await query({
        query: GET_EDUCATIONS,
      })

      expect(data.getEducations[0].name).toBe('High school')
      expect(data.getEducations[1].name).toBe('PhD')
    })
  })
})
