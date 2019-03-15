import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'
import { skillInput, skillInput2 } from './__fixtures__/skills'

const GET_SKILLS = gql`
  query skills {
    skills {
      taxonomyId
      term
      type
    }
  }
`

const ADD_SKILL = gql`
  mutation addskill($taxonomyId: String!, $term: String!, $type: String!) {
    addSkill(skill: { taxonomyId: $taxonomyId, term: $term, type: $type }) {
      id
      taxonomyId
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
    const result = await mutate({
      mutation: ADD_SKILL,
      variables: skillInput,
    })

    const {
      data: { addSkill },
    } = result
    expect(addSkill).toEqual({
      id: expect.any(String),
      ...skillInput,
    })

    const {
      data: { skills },
    } = await query({
      query: GET_SKILLS,
    })

    const addedSkill = skills[0]

    expect(addedSkill).toEqual(skillInput)
  })

  it('should be possible to remove a skill', async () => {
    const {
      data: { addSkill },
    } = await mutate({
      mutation: ADD_SKILL,
      variables: skillInput2,
    })

    await mutate({
      mutation: REMOVE_SKILL,
      variables: {
        id: addSkill.id,
      },
    })

    const { data: dataAfterDelete } = await query({
      query: GET_SKILLS,
    })
    const success = dataAfterDelete.skills.every(
      ({ taxonomyId }) => taxonomyId !== skillInput2.taxonomyId
    )
    expect(success).toBeTruthy()
  })
})
