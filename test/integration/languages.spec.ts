import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'

const GET_LANGUAGES = gql`
  query getLanguages {
    getLanguages
  }
`

const ADD_LANGUAGE = gql`
  mutation addLanguage($language: Language!) {
    addLanguage(language: $language)
  }
`

describe.only('#Languages', () => {
  let query: any
  let mutate: any
  let mydata: { getData: any; saveData: any }

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(() => server.stop())

  beforeEach(async () => {
    mydata = {
      getData: jest.fn(),
      saveData: jest.fn(),
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

  describe('getLanguages', () => {
    beforeEach(() => {
      mydata.getData.mockResolvedValue(['swedish'])
    })

    it('should get languages', async () => {
      const { data } = await query({
        query: GET_LANGUAGES,
      })
      expect(data.getLanguages[0]).toBe('swedish')
    })
  })

  describe.only('addLanguage', () => {
    enum Language {
      Swedish = 'swedish',
      English = 'english',
    }
    beforeEach(() => {
      mydata.saveData.mockResolvedValue(['swedish'])
    })

    it('should be possible to add an experience', async () => {
      const { data } = await mutate({
        mutation: ADD_LANGUAGE,
        variables: {
          language: Language.Swedish,
        },
      })

      expect(data.addLanguage[0]).toBe('swedish')
    })
  })
})
