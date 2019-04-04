import { login } from '../login'

test('returns a login consent url', async () => {
  const loginConsentRequestData = await login({}, {}, {} as any, {} as any)

  expect(loginConsentRequestData).toHaveProperty('url')
  expect(loginConsentRequestData).toHaveProperty('sessionId')
})
