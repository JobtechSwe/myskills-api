import { gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-testing'
import server, { appIsReady } from '../../lib/server'

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
  let mydata: { getData: any; saveData: any }

  beforeEach(async () => {
    await appIsReady
    mydata = {
      getData: jest.fn(),
      saveData: jest.fn(),
    }
    // @ts-ignore
    const context = server.context({})

    // @ts-ignore
    server.context = () => ({
      ...context,
      headers: {
        token: 'sometoken',
      },
      mydata,
    })

    const client = createTestClient(server)
    mutate = client.mutate
    query = client.query
  })

  describe('getEducations', () => {
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

      expect(data.getEducations[0].name).toBe('Simon')
    })
  })

  describe('addEducation', () => {
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
