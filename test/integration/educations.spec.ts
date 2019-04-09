import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EDUCATIONS = gql`
  query educations {
    educations {
      term
    }
  }
`

const ADD_EDUCATION = gql`
  mutation addEducation($term: String!, $taxonomyId: String!) {
    addEducation(education: { term: $term, taxonomyId: $taxonomyId }) {
      id
      taxonomyId
      term
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

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  it('should be possible to add and get multiple education for user', async () => {
    const {
      data: { addEducation },
    } = await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        taxonomyId: '123456789',
        term: 'High school',
      },
    })
    expect(addEducation.term).toBe('High school')

    await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        taxonomyId: '58',
        term: 'PhD',
      },
    })

    const { data } = await query({
      query: GET_EDUCATIONS,
    })

    expect(data.educations[0].term).toBe('High school')
    expect(data.educations[1].term).toBe('PhD')
  })

  it('should be possible to remove an education', async () => {
    const {
      data: {
        addEducation: { id: addedEducationId },
      },
    } = await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        taxonomyId: '123456789',
        term: 'Primary School',
      },
    })

    const {
      data: { removeEducation },
    } = await mutate({
      mutation: REMOVE_EDUCATION,
      variables: {
        id: addedEducationId,
      },
    })

    expect(removeEducation).toEqual(true)

    const { data: dataAfterDelete } = await query({
      query: GET_EDUCATIONS,
    })
    const success = dataAfterDelete.educations.every(
      ({ term }) => term !== 'Primary School'
    )
    expect(success).toBeTruthy()
  })
})
