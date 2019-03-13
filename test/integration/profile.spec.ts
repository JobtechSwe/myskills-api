import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_PROFILE = gql`
  query profile {
    profile {
      firstName
      lastName
    }
  }
`

const CREATE_PROFILE = gql`
  mutation createProfile($firstName: String!, $lastName: String!) {
    createProfile(profile: { firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
    }
  }
`

describe('#profile', () => {
  let query: any
  let mutate: any

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(() => server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  it('creates and gets profile', async () => {
    const {
      data: { createProfile },
    } = await mutate({
      mutation: CREATE_PROFILE,
      variables: {
        firstName: 'John',
        lastName: 'Doe',
      },
    })
    expect(createProfile).toEqual({ firstName: 'John', lastName: 'Doe' })

    const { data } = await query({
      query: GET_PROFILE,
    })
    expect(data.profile).toEqual({ firstName: 'John', lastName: 'Doe' })
  })
})
