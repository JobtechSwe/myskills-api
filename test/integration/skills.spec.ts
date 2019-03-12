import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'
import { skillInput, skillInput2 } from './__fixtures__/skills'

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

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  it('should be possible to add and get multiple skills', async () => {
    const {
      data: { addSkill },
    } = await mutate({
      mutation: ADD_SKILL,
      variables: skillInput,
    })
    expect(addSkill[0]).toEqual(skillInput)

    const {
      data: { skills },
    } = await query({
      query: GET_SKILLS,
    })

    const addedSkill = skills[0]

    expect(addedSkill).toEqual(skillInput)
  })

  it('should be possible to remove an experience', async () => {
    await mutate({
      mutation: ADD_SKILL,
      variables: skillInput2,
    })

    await mutate({
      mutation: REMOVE_SKILL,
      variables: {
        id: skillInput2.conceptId,
      },
    })

    const { data: dataAfterDelete } = await query({
      query: GET_SKILLS,
    })
    const success = dataAfterDelete.skills.every(
      ({ conceptId }) => conceptId !== skillInput2.conceptId
    )
    expect(success).toBeTruthy()
  })
})
