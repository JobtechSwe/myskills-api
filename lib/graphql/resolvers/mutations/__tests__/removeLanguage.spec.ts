import { removeLanguage } from '../removeLanguage'
import { Language } from '../../../../__generated__/myskills'
import { ctx } from '../../../__mocks__/apolloServerContext'
import { ApolloServerContext } from '../../../../typings/context'

const args = {
  language: 'swedish' as Language,
}

test('removes language in mydata', async () => {
  await removeLanguage({}, args, ctx as any, {} as any)

  expect(ctx.mydata.removeData).toHaveBeenCalledWith({
    area: 'languages',
    token: 'token',
    key: '',
    id: args.language,
  })
})

test('returns true on success', async () => {
  const result = true

  ctx.mydata.removeData.mockResolvedValue(result)

  await expect(
    removeLanguage({}, args, ctx as any, {} as any)
  ).resolves.toEqual(true)
})

test('handles errors', async () => {
  ctx.mydata.removeData.mockRejectedValue('err')

  await expect(removeLanguage({}, args, ctx as any, {} as any)).rejects.toThrow(
    'err'
  )
})
