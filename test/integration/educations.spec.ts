import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'

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
  let mydata: { getData: any; saveData: any }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

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

  describe('educations', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue([
        {
          name: 'Simon',
        },
      ])
    })

    it('should get educations', async () => {
      const { data } = await query({
        query: GET_EDUCATIONS,
      })

      expect(data.educations[0].name).toBe('Simon')
    })
  })

  describe('education', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([
        {
          id: '123',
          name: 'Simon :)',
        },
      ])
    })

    it('should be possible to add an education', async () => {
      const {
        data: { addEducation },
      } = await mutate({
        mutation: ADD_EDUCATION,
        variables: {
          id: 'id',
          name: 'simon',
        },
      })

      expect(addEducation[0].name).toBe('Simon :)')
    })
  })
})
