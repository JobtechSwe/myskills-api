import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EXPERIENCES = gql`
  query experiences {
    experiences {
      term
      start
      employer
      end
    }
  }
`

const ADD_EXPERIENCE = gql`
  mutation addExperience(
    $term: String!
    $sourceId: String!
    $employer: String!
    $start: String!
    $end: String!
  ) {
    addExperience(
      experience: {
        term: $term
        sourceId: $sourceId
        employer: $employer
        start: $start
        end: $end
      }
    ) {
      id
      sourceId
      employer
      term
      start
      end
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
        employer: 'Musses mysiga musteri',
        term: 'Carpenter',
        start: '201901',
        end: '201902',
      },
    })

    expect(addExperience.term).toBe('Carpenter')

    await mutate({
      mutation: ADD_EXPERIENCE,
      variables: {
        sourceId: 'taxonomyId5',
        employer: 'Stinas styrkelabb',
        term: 'Mason',
        start: '202001',
        end: '202002',
      },
    })
    const { data } = await query({
      query: GET_EXPERIENCES,
    })

    expect(data.experiences[0].term).toBe('Carpenter')
    expect(data.experiences[0].start).toBe('201901')
    expect(data.experiences[0].end).toBe('201902')
    expect(data.experiences[0].employer).toBe('Musses mysiga musteri')
    expect(data.experiences[1].term).toBe('Mason')
    expect(data.experiences[1].employer).toBe('Stinas styrkelabb')
    expect(data.experiences[1].start).toBe('202001')
    expect(data.experiences[1].end).toBe('202002')
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
        start: '201801',
        end: '201802',
        employer: 'Kalles snickeri',
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
