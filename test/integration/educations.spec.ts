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

const REMOVE_EDUCATION = gql`
  mutation removeEducation($id: String!) {
    removeEducation(id: $id)
  }
`

describe('#educations', () => {
  let query: any
  let mutate: any
  let mydata: { getData: any; saveData: any; removeData: any }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    mydata = {
      getData: jest.fn(),
      saveData: jest.fn(),
      removeData: jest.fn(),
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

  describe('query: educations', () => {
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

  describe('mutation: addEducation', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([
        {
          id: '123',
          name: 'Simon',
        },
      ])
    })

    it('should be possible to add an education', async () => {
      const {
        data: { addEducation },
      } = await mutate({
        mutation: ADD_EDUCATION,
        variables: {
          id: '123',
          name: 'Simon',
        },
      })

      expect(addEducation[0].name).toBe('Simon')
    })
  })

  describe('mutation: removeEducation', () => {
    beforeEach(() => {
      mydata.removeData.mockResolvedValue(true)
    })

    it('should be possible to remove an education', async () => {
      const {
        data: { removeEducation },
      } = await mutate({
        mutation: REMOVE_EDUCATION,
        variables: {
          id: '123',
        },
      })

      expect(removeEducation).toEqual(true)
    })
  })
})
