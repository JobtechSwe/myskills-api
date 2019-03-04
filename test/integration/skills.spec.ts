import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import { skillInput } from './__fixtures__/skills'

const GET_SKILLS = gql`
  query skills {
    skills {
      conceptId
      term
      type
    }
  }
`

const ADD_SKILL = gql`
  mutation skill($conceptId: String!, $term: String!, $type: String!) {
    skill(skill: { conceptId: $conceptId, term: $term, type: $type }) {
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

  describe('skills', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue([skillInput])
    })

    it('should get skills', async () => {
      const { data } = await query({
        query: GET_SKILLS,
      })

      const addedSkill = data.skills[0]

      expect(addedSkill).toMatchObject(skillInput)
    })
  })

  describe('skill', () => {
    beforeEach(() => {
      mydata.saveData.mockResolvedValue([skillInput])
    })

    it('should be possible to add a skill', async () => {
      const {
        data: { skill },
      } = await mutate({
        mutation: ADD_SKILL,
        variables: skillInput,
      })

      const addedSkill = skill[0]
      expect(addedSkill).toMatchObject(skillInput)
    })
  })
})
