import authToken from '../authorizationToken'
import { Request } from 'express'

describe('authorizationToken', () => {
  type reqType = { token?: string; headers: { authorization?: string } }

  test('throws error if AuthorizationToken does not start with Bearer', () => {
    const req: reqType = {
      headers: {
        authorization: 'Basic actualTokenString',
      },
    }

    expect(() => {
      authToken(<Request>req)
    }).toThrow()
  })

  test('sets token to undefined if no Authorization is set', () => {
    const req: reqType = {
      headers: {},
      token: 'fakeToken',
    }
    const token = authToken(<Request>req)

    expect(token).toBe(undefined)
  })

  test(`sets token to whatever follows 'Bearer'`, () => {
    const req: reqType = {
      headers: { authorization: 'Bearer actualTokenString' },
      token: 'something differnt',
    }
    const token = authToken(<Request>req)

    expect(token).toBe('actualTokenString')
  })
})
