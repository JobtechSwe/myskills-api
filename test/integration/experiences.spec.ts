import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EXPERIENCES = gql`
  query experiences {
    experiences {
      term
      years
    }
  }
`

const ADD_EXPERIENCE = gql`
  mutation addExperience($term: String!, $sourceId: String!, $years: String!) {
    addExperience(
      experience: { term: $term, sourceId: $sourceId, years: $years }
    ) {
      id
      sourceId
      term
      years
    }
  }
`

const REMOVE_EXPERIENCE = gql`
  mutation removeExperience($id: String!) {
    removeExperience(id: $id)
  }
`

describe('#experiences', () => {
  let query: any
  let mutate: any

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(() => server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  it('should be possible to add and get multiple work experiences for user', async () => {
    const {
      data: { addExperience },
    } = await mutate({
      mutation: ADD_EXPERIENCE,
      variables: {
        sourceId: 'taxonomyId1',
        term: 'Carpenter',
        years: '29',
      },
    })

    expect(addExperience.term).toBe('Carpenter')

    await mutate({
      mutation: ADD_EXPERIENCE,
      variables: {
        sourceId: 'taxonomyId5',
        term: 'Mason',
        years: '5',
      },
    })
    const { data } = await query({
      query: GET_EXPERIENCES,
    })

    expect(data.experiences[0].term).toBe('Carpenter')
    expect(data.experiences[0].years).toBe('29')
    expect(data.experiences[1].term).toBe('Mason')
    expect(data.experiences[1].years).toBe('5')
  })

  it('should be possible to remove an experience', async () => {
    const {
      data: {
        addExperience: { id: addedExperienceId },
      },
    } = await mutate({
      mutation: ADD_EXPERIENCE,
      variables: {
        sourceId: '42',
        term: 'Philosopher',
        years: '29',
      },
    })

    const {
      data: { removeExperience },
    } = await mutate({
      mutation: REMOVE_EXPERIENCE,
      variables: {
        id: addedExperienceId,
      },
    })

    expect(removeExperience).toEqual(true)

    const {
      data: { experiences },
    } = await query({
      query: GET_EXPERIENCES,
    })
    const success = experiences.every(({ term }) => term !== 'Philosopher')
    expect(success).toBeTruthy()
  })
})
