import { ctx } from '../../../__mocks__/apolloServerContext'
import { ontologyRelated } from '../ontologyRelated'
import {
  OntologyRelatedQueryArgs,
  OntologyType,
} from '../../../../__generated__/myskills'

beforeEach(() => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockResolvedValue({
    count: 10,
    relations: [
      {
        uuid: 'someRelationId',
        name: 'someRelationName',
        type: 'Skill',
        details: {
          Word2Vec: 0.41,
        },
        score: 0.81,
      },
    ],
    concepts: [
      {
        uuid: 'someConceptId',
        name: 'someConceptName',
        type: 'Skill',
      },
    ],
  })
})

test('passes query params to ontologyAPI', async () => {
  const testArgs: OntologyRelatedQueryArgs = {
    params: {
      concept: ['someConcept'],
      id: ['someId'],
      limit: 10,
      type: 'Skill' as OntologyType,
    },
  }

  await ontologyRelated({}, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.ontologyAPI.getData).toHaveBeenCalledWith(
    'concept/related',
    {
      concept: ['someConcept'],
      uuid: ['someId'],
      limit: 10,
      type: 'Skill' as OntologyType,
    }
  )
})

test('return a formated result', async () => {
  const testArgs: OntologyRelatedQueryArgs = {
    params: {
      concept: ['someConcept'],
      id: ['someId'],
      limit: 10,
      type: 'Skill' as OntologyType,
    },
  }

  const result = await ontologyRelated({}, testArgs, ctx as any, {} as any)

  expect(result).toEqual({
    count: 10,
    relations: [
      {
        id: 'someRelationId',
        name: 'someRelationName',
        type: 'Skill',
        details: {
          word2Vec: 0.41,
        },
        score: 0.81,
      },
    ],
    concepts: [
      {
        id: 'someConceptId',
        name: 'someConceptName',
        type: 'Skill',
      },
    ],
  })
})

test('handles errors', async () => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockRejectedValue('err')

  await expect(
    ontologyRelated({}, {} as any, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
