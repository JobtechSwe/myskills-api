import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_EDUCATIONS = gql`
  query educations {
    educations {
      name
    }
  }
`

const ADD_EDUCATION = gql`
  mutation addEducation($name: String!, $id: String!) {
    addEducation(education: { name: $name, id: $id }) {
      id
      name
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
        id: '123456789',
        name: 'High school',
      },
    })

    expect(addEducation[0].name).toBe('High school')

    await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        id: '58',
        name: 'PhD',
      },
    })

    const { data } = await query({
      query: GET_EDUCATIONS,
    })

    expect(data.educations[0].name).toBe('High school')
    expect(data.educations[1].name).toBe('PhD')
  })

  it('should be possible to remove an education', async () => {
    await mutate({
      mutation: ADD_EDUCATION,
      variables: {
        id: '123456789',
        name: 'Primary School',
      },
    })

    const {
      data: { removeEducation },
    } = await mutate({
      mutation: REMOVE_EDUCATION,
      variables: {
        id: '123456789',
      },
    })
    expect(removeEducation).toEqual(true)

    const { data: dataAfterDelete } = await query({
      query: GET_EDUCATIONS,
    })
    const success = dataAfterDelete.educations.every(
      ({ name }) => name !== 'Primary School'
    )
    expect(success).toBeTruthy()
  })
})
