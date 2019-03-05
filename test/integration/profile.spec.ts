import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'

const GET_PROFILE = gql`
  query profile {
    profile {
      firstName
      lastName
    }
  }
`

const CREATE_PROFILE = gql`
  mutation profile($firstName: String!, $lastName: String!) {
    profile(profile: { firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
    }
  }
`

describe('#profile', () => {
  let query: any
  let mutate: any
  let mydata: { getData: any; saveData: any }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(() => server.stop())

  beforeEach(async () => {
    mydata = {
      getData: jest.fn(),
      saveData: jest.fn(),
    }
    ;({ query, mutate } = getClient(server, {
      context: {
        headers: {
          token: 'sometoken',
        },
        mydata,
      },
    }))
  })

  describe('Get profile', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue({ firstName: 'John', lastName: 'Doe' })
    })

    it('should get profile', async () => {
      const { data } = await query({
        query: GET_PROFILE,
      })

      expect(data.profile).toEqual({ firstName: 'John', lastName: 'Doe' })
    })
  })

  describe('create profile', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue({ firstName: 'John', lastName: 'Doe' })
    })

    it('should be possible to create a profile', async () => {
      const { data } = await mutate({
        mutation: CREATE_PROFILE,
        variables: {
          firstName: 'John',
          lastName: 'Doe',
        },
      })

      expect(data.profile).toEqual({ firstName: 'John', lastName: 'Doe' })
    })
  })
})
