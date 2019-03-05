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
  mutation addskill($conceptId: String!, $term: String!, $type: String!) {
    addSkill(skill: { conceptId: $conceptId, term: $term, type: $type }) {
      conceptId
      term
      type
    }
  }
`

const REMOVE_SKILL = gql`
  mutation removeSkill($id: String!) {
    removeSkill(id: $id)
  }
`

describe('#skills', () => {
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

  describe('skills', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue([skillInput])
    })

    it('should get skills', async () => {
      const { data } = await query({
        query: GET_SKILLS,
      })

      const addedSkill = data.skills[0]

      expect(addedSkill).toEqual(skillInput)
    })
  })

  describe('skill', () => {
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

      expect(addSkill[0]).toEqual(skillInput)
    })
  })

  describe('mutation: removeSkill', () => {
    beforeEach(() => {
      mydata.removeData.mockResolvedValue(true)
    })

    it('should be possible to remove an experience', async () => {
      const {
        data: { removeSkill },
      } = await mutate({
        mutation: REMOVE_SKILL,
        variables: {
          id: '123',
        },
      })

      expect(removeSkill).toEqual(true)
    })
  })
})
