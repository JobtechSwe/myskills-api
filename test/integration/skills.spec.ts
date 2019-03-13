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
    const {
      data: { addSkill },
    } = await mutate({
      mutation: ADD_SKILL,
      variables: skillInput,
    })
    expect(addSkill[0]).toEqual({
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

    const addedSkillId = addSkill.find(
      x => x.taxonomyId === skillInput2.taxonomyId
    ).id

    await mutate({
      mutation: REMOVE_SKILL,
      variables: {
        id: addedSkillId,
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
