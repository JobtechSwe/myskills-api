import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EDUCATIONS = gql`
  query educations {
    educations {
      programme
      school
      start
      end
    }
  }
`

const ADD_EDUCATION = gql`
  mutation addEducation(
    $programme: String!
    $school: String!
    $start: String!
    $end: String
  ) {
    addEducation(
      education: {
        programme: $programme
        school: $school
        start: $start
        end: $end
      }
    ) {
      id
      programme
      school
      start
      end
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
        programme: 'Fotboll',
        school: 'Gubbängsskolan',
        start: '1994-06-19',
        end: '2003-09-23',
      },
    })
    expect(addEducation.programme).toBe('Fotboll')

    await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        programme: 'Maskin',
        school: 'LTU',
        start: '2004-06-19',
        end: '2009-09-23',
      },
    })

    const { data } = await query({
      query: GET_EDUCATIONS,
    })

    expect(data.educations[0].school).toBe('Gubbängsskolan')
    expect(data.educations[1].school).toBe('LTU')
  })

  it('should be possible to remove an education', async () => {
    const {
      data: {
        addEducation: { id: addedEducationId },
      },
    } = await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        programme: 'Maskin',
        school: 'LTU',
        start: '2004-06-19',
        end: '2009-09-23',
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
      ({ programme }) => programme !== 'Maskin'
    )
    expect(success).toBeTruthy()
  })
})
