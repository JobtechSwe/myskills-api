import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import { skillInput } from './__fixtures__/skills'

const GET_SKILLS = gql`
  query getSkills {
    getSkills {
      conceptId
      term
      type
    }
  }
`

const ADD_SKILL = gql`
  mutation addSkill($conceptId: String!, $term: String!, $type: String!) {
    addSkill(skill: { conceptId: $conceptId, term: $term, type: $type }) {
      conceptId
      term
      type
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
      mydata.getData.mockResolvedValue([skillInput])
    })

    it('should get skills', async () => {
      const { data } = await query({
        query: GET_SKILLS,
      })

      const addedSkill = data.getSkills[0]

      expect(addedSkill).toMatchObject(skillInput)
    })
  })

  describe('addSkill', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([skillInput])
    })

    it('should be possible to add a skill', async () => {
      const {
        data: { addSkill },
      } = await mutate({
        mutation: ADD_SKILL,
        variables: skillInput,
      })

      const addedSkill = addSkill[0]
      expect(addedSkill).toMatchObject(skillInput)
    })
  })
})
