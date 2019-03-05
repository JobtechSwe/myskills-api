import { addLanguage } from '../addLanguage'
import { Language } from '../../../../__generated__/myskills'
import { ctx } from '../../../__mocks__/apolloServerContext'

const args = {
  language: 'swedish' as Language,
}

test('save input in mydata', async () => {
  await addLanguage({}, args, ctx, {} as any)

  expect(ctx.mydata.saveData).toHaveBeenCalledWith({
    area: 'languages',
    data: args.language,
    token: 'token',
  })
})

test('returns updated data', async () => {
  const result = [args.language]

  ctx.mydata.saveData.mockResolvedValue(result)

  await expect(addLanguage({}, args, ctx, {} as any)).resolves.toEqual(result)
})

test('handles errors', async () => {
  ctx.mydata.saveData.mockRejectedValue('err')

  await expect(addLanguage({}, args, ctx, {} as any)).rejects.toThrow('err')
})
