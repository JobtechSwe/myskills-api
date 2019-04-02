import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getClient } from './integrationUtils'
import * as ontologyFixtures from './__fixtures__/ontology'

const GET_ONTOLOGY_CONCEPTS = gql`
  query ontologyConcepts($limit: Int, $offset: Int, $type: OntologyType) {
    ontologyConcepts(params: { limit: $limit, offset: $offset, type: $type }) {
      id
      name
      type
    }
  }
`

const GET_ONTOLOGY_RELATED = gql`
  query ontologyRelated(
    $concept: [String!]
    $id: [String!]
    $limit: Int
    $type: OntologyType!
  ) {
    ontologyRelated(
      params: { concept: $concept, id: $id, type: $type, limit: $limit }
    ) {
      count
      concepts {
        id
        name
        type
      }
      relations {
        id
        name
        type
        score
        details {
          word2Vec
        }
      }
    }
  }
`

const GET_ONTOLOGY_TEXT_PARSE = gql`
  query ontologyTextParse($text: String!) {
    ontologyTextParse(text: $text) {
      id
      name
      type
      terms
    }
  }
`

const GET_ONTOLOGY_CONCEPT = gql`
  query ontologyConcept(
    $id: String!
    $limit: Int
    $offset: Int
    $type: OntologyType
  ) {
    ontologyConcept(
      id: $id
      params: { limit: $limit, offset: $offset, type: $type }
    ) {
      id
      name
      type
      terms {
        name
        type
      }
    }
  }
`

describe('ontology', () => {
  let query: Function

  beforeAll(async () => {
    await appIsReady
  })

  afterAll(async () => await server.stop())

  beforeEach(async () => {
    ;({ query } = getClient(server))
  })

  describe('ontologyConcepts', () => {
    it('should get a list of ontology concepts', async () => {
      const variables = {
        offset: 0,
        limit: 10,
        type: 'SKILL',
      }

      const { data } = await query({
        query: GET_ONTOLOGY_CONCEPTS,
        variables,
      })

      expect(data.ontologyConcepts).toEqual(ontologyFixtures.ontologyConcepts)
    })
  })

  describe('ontologyConcept', () => {
    it('should get a concept by id', async () => {
      const { data } = await query({
        query: GET_ONTOLOGY_CONCEPT,
        variables: {
          id: 'b8460092-7c21-5769-80de-d9b94d142839', // Snickare
          offset: 0,
          limit: 10,
          type: 'SKILL',
        },
      })

      expect(data.ontologyConcept).toEqual(ontologyFixtures.ontologyConcept)
    })
  })

  describe.only('ontologyRelated', () => {
    it('should get related by concept', async () => {
      const { data } = await query({
        query: GET_ONTOLOGY_RELATED,
        variables: {
          concept: ['snickare'],
          limit: 10,
          type: 'SKILL',
        },
      })

      expect(data.ontologyRelated).toEqual(
        ontologyFixtures.ontologyRelatedByConcept
      )
    })

    it('should get related by id', async () => {
      const { data } = await query({
        query: GET_ONTOLOGY_RELATED,
        variables: {
          id: ['b8460092-7c21-5769-80de-d9b94d142839'],
          limit: 10,
          type: 'SKILL',
        },
      })

      expect(data.ontologyRelated).toEqual(
        ontologyFixtures.ontologyRelatedByConcept
      )
    })
  })

  describe('ontologyTextParse', () => {
    it('should get ontology parse', async () => {
      const { data } = await query({
        query: GET_ONTOLOGY_TEXT_PARSE,
        variables: {
          text:
            'Jag heter Batman och jag är en duktig snickare som på fritiden har en djup passion för matlagning',
        },
      })

      expect(data.ontologyTextParse).toEqual(ontologyFixtures.ontologyTextParse)
    })
  })
})
