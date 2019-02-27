import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'

const GET_SKILLS = gql`
  query getSkills {
    getSkills {
      id
      name
    }
  }
`

const ADD_SKILL = gql`
  mutation addSkill($name: String!, $id: String!) {
    addSkill(skill: { name: $name, id: $id }) {
      id
      name
    }
  }
`

describe('#skills', () => {
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

  describe('getSkills', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue([
        {
          id: 'someId',
          name: 'Simon',
        },
      ])
    })

    it('should get skills', async () => {
      const { data } = await query({
        query: GET_SKILLS,
      })

      expect(data.getSkills[0].name).toBe('Simon')
    })
  })

  describe('addSkill', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([
        {
          id: '123',
          name: 'Simon :)',
        },
      ])
    })

    it('should be possible to add a skill', async () => {
      const {
        data: { addSkill },
      } = await mutate({
        mutation: ADD_SKILL,
        variables: {
          id: 'id',
          name: 'simon',
        },
      })

      expect(addSkill[0].name).toBe('Simon :)')
    })
  })
})
