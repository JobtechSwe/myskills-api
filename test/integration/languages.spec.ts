import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'

const GET_LANGUAGES = gql`
  query languages {
    languages
  }
`

const ADD_LANGUAGE = gql`
  mutation addLanguage($language: Language!) {
    addLanguage(language: $language)
  }
`
const REMOVE_LANGUAGE = gql`
  mutation removeLanguage($language: Language!) {
    removeLanguage(language: $language)
  }
`
enum Language {
  Swedish = 'swedish',
  Spanish = 'spanish',
}

describe('#languages', () => {
  let query: any
  let mutate: any

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(() => server.stop())

  beforeEach(async () => {
    ;({ query, mutate } = await getConsentedClient(server))
  })

  it('should be possible to add and get languages', async () => {
    const {
      data: { addLanguage },
    } = await mutate({
      mutation: ADD_LANGUAGE,
      variables: {
        language: Language.Swedish,
      },
    })

    expect(addLanguage[0]).toBe('swedish')

    const { data } = await query({
      query: GET_LANGUAGES,
    })
    expect(data.languages[0]).toBe('swedish')
  })

  describe('mutation: removeLanguage', () => {
    it('should be possible to remove a language', async () => {
      await mutate({
        mutation: ADD_LANGUAGE,
        variables: {
          language: Language.Spanish,
        },
      })

      const {
        data: { removeLanguage },
      } = await mutate({
        mutation: REMOVE_LANGUAGE,
        variables: {
          language: Language.Spanish,
        },
      })
      expect(removeLanguage).toEqual(true)

      const { data: dataAfterDelete } = await query({
        query: GET_LANGUAGES,
      })

      const success = dataAfterDelete.languages.every(
        language => language !== Language.Spanish
      )
      expect(success).toBeTruthy()
    })
  })
})
