import { ctx } from '../../../__mocks__/apolloServerContext'
import { ontologyConcept } from '../ontologyConcept'
import {
  OntologyConceptQueryArgs,
  OntologyType,
} from '../../../../__generated__/myskills'

beforeEach(() => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockResolvedValue({
    uuid: 'someUuid',
    term: 'getConceptsName',
    type: 'SKILL',
    terms: [
      {
        term: 'someTermName',
        type: 'someTermType',
      },
    ],
  })
})

test('passes query params to ontologyAPI', async () => {
  const testArgs: OntologyConceptQueryArgs = {
    id: 'someId',
    params: {
      type: 'Skill' as OntologyType,
      limit: 10,
      offset: 0,
    },
  }

  await ontologyConcept({}, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.ontologyAPI.getData).toHaveBeenCalledWith(
    'concept/someId/terms',
    testArgs.params
  )
})

test('return a formated result', async () => {
  const testArgs: OntologyConceptQueryArgs = {
    id: 'someId',
    params: {
      type: 'Skill' as OntologyType,
      limit: 10,
      offset: 0,
    },
  }

  const result = await ontologyConcept({}, testArgs, ctx as any, {} as any)

  expect(result).toEqual({
    id: 'someUuid',
    term: 'getConceptsName',
    type: 'SKILL',
    terms: [
      {
        term: 'someTermName',
        type: 'someTermType',
      },
    ],
  })
})

test('handles errors', async () => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockRejectedValue('err')

  await expect(
    ontologyConcept({}, {} as any, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
