import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'

const GET_EXPERIENCES = gql`
  query experiences {
    experiences {
      name
    }
  }
`

const ADD_EXPERIENCE = gql`
  mutation experience($name: String!, $id: String!, $years: String!) {
    experience(experience: { name: $name, id: $id, years: $years }) {
      id
      name
      years
    }
  }
`

describe('#experiences', () => {
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

  describe('experiences', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue([
        {
          name: 'Cookie Eating',
          years: '5',
        },
      ])
    })

    it('should get experiences', async () => {
      const { data } = await query({
        query: GET_EXPERIENCES,
      })

      expect(data.experiences[0].name).toBe('Cookie Eating')
    })
  })

  describe('experience', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([
        {
          id: '123',
          name: 'Carpenter',
          years: '29',
        },
      ])
    })

    it('should be possible to add an experience', async () => {
      const {
        data: { experience },
      } = await mutate({
        mutation: ADD_EXPERIENCE,
        variables: {
          id: 'id',
          name: 'Carpenter',
          years: '29',
        },
      })

      expect(experience[0].name).toBe('Carpenter')
    })
  })
})
