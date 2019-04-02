import { ctx } from '../../../__mocks__/apolloServerContext'
import { ontologyTextParse } from '../ontologyTextParse'
import { OntologyTextParseQueryArgs } from '../../../../__generated__/myskills'

beforeEach(() => {
  ;(ctx.dataSources.ontologyAPI.postData as jest.Mock).mockResolvedValue([
    {
      uuid: 'someUuid',
      name: 'someName',
      type: 'SKILL',
      terms: 'someTerms',
    },
  ])
})

test('passes query params to ontologyAPI', async () => {
  const testArgs: OntologyTextParseQueryArgs = {
    text: 'some text to parse',
  }

  await ontologyTextParse({}, testArgs, ctx as any, {} as any)

  expect(ctx.dataSources.ontologyAPI.postData).toHaveBeenCalledWith(
    'text-to-structure',
    { body: testArgs.text }
  )
})

test('return a formated result', async () => {
  const testArgs: OntologyTextParseQueryArgs = {
    text: 'some cv text to get structure for',
  }

  const result = await ontologyTextParse({}, testArgs, ctx as any, {} as any)

  expect(result).toEqual([
    {
      id: 'someUuid',
      name: 'someName',
      type: 'SKILL',
      terms: 'someTerms',
    },
  ])
})

test('handles errors', async () => {
  ;(ctx.dataSources.ontologyAPI.postData as jest.Mock).mockRejectedValue('err')

  await expect(
    ontologyTextParse({}, { text: '' }, ctx as any, {} as any)
  ).rejects.toThrow('err')
})
