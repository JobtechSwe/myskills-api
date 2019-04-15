import { ctx } from '../../../__mocks__/apolloServerContext'
import { ontologyConcepts } from '../ontologyConcepts'
import {
  OntologyConceptsQueryArgs,
  OntologyType,
} from '../../../../__generated__/myskills'

beforeEach(() => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockResolvedValue([
    {
      uuid: 'someUuid',
      name: 'getConceptsName',
      type: 'SKILL',
    },
    {
      uuid: 'anotherUuid',
      name: 'anotherName',
      type: 'OCCUPATION',
    },
  ])
})

test('passes query params to ontologyAPI', async () => {
  const testArgs: OntologyConceptsQueryArgs = {
    params: {
      type: 'Skill' as OntologyType,
      limit: 10,
      offset: 0,
    },
  }

  await ontologyConcepts({}, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.ontologyAPI.getData).toHaveBeenCalledWith(
    'concept',
    testArgs.params
  )
})

test('return a formated result', async () => {
  const testArgs: OntologyConceptsQueryArgs = {
    params: {
      type: 'Skill' as OntologyType,
      limit: 10,
      offset: 0,
    },
  }

  const result = await ontologyConcepts({}, testArgs, ctx as any, {} as any)

  expect(result).toEqual([
    {
      id: 'someUuid',
      name: 'getConceptsName',
      type: 'SKILL',
    },
    {
      id: 'anotherUuid',
      name: 'anotherName',
      type: 'OCCUPATION',
    },
  ])
})

test('handles errors', async () => {
  ;(ctx.dataSources.ontologyAPI.getData as jest.Mock).mockRejectedValue('err')

  await expect(ontologyConcepts({}, {}, ctx as any, {} as any)).rejects.toThrow(
    'err'
  )
})
