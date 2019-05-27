import { getLoginUrl } from '../getLoginUrl'

test('returns a login consent url', async () => {
  const loginConsentRequestData = await getLoginUrl(
    {} as any,
    {},
    {} as any,
    {} as any
  )

  expect(loginConsentRequestData).toHaveProperty('url')
  expect(loginConsentRequestData).toHaveProperty('sessionId')
})
