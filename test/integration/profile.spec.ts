import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_PROFILE = gql`
  query profile {
    profile {
      name
      email
      telephone
    }
  }
`

const CREATE_PROFILE = gql`
  mutation createProfile($name: String!, $email: String!, $telephone: String) {
    createProfile(
      profile: { name: $name, email: $email, telephone: $telephone }
    ) {
      name
      email
      telephone
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
        name: 'John Sonsson',
        email: 'doe@example.com',
        telephone: '0123456789',
      },
    })
    expect(createProfile).toEqual({
      name: 'John Sonsson',
      email: 'doe@example.com',
      telephone: '0123456789',
    })

    const { data } = await query({
      query: GET_PROFILE,
    })
    expect(data.profile).toEqual({
      name: 'John Sonsson',
      email: 'doe@example.com',
      telephone: '0123456789',
    })
  })
})
