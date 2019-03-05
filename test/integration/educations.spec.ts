import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import {
  getClient,
  createMyDataAccount,
  approveConsent,
} from './integrationUtils'
import { consents } from '../../lib/adapters/mydata'
import { Login } from '../../lib/__generated__/myskills'
import { defaultRequest } from '../../lib/services/consents'
import { getConsentRequest } from '../../lib/services/db'

const GET_EDUCATIONS = gql`
  query getEducations {
    getEducations {
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

describe.only('#educations', () => {
  let query: any
  let mutate: any

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    await createMyDataAccount()
    const request = defaultRequest(3600 * 24 * 31)
    const { id } = await consents.request<Login>(request)
    await approveConsent(id)
    const { accessToken } = await getConsentRequest(id)
    ;({ query, mutate } = getClient(server, {
      context: {
        headers: {
          token: accessToken,
        },
      },
    }))
  })

  describe('getEducations', () => {
    it('should get educations', async () => {
      const { data } = await query({
        query: GET_EDUCATIONS,
      })

      expect(data.getEducations[0].name).toBe('Simon')
    })
  })

  describe.only('addEducation', () => {
    it.only('should be possible to add an education', async () => {
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
    })
  })
})
