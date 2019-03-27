import authToken from '../authorizationToken'
import { Request } from 'express'

describe('authorizationToken', () => {
  type reqType = { headers: { authorization?: string } }

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

  test('throws error if no Authorization is set', () => {
    const req: reqType = {
      headers: {},
    }
    expect(() => {
      authToken(<Request>req)
    }).toThrow()
  })

  test(`sets token to whatever follows 'Bearer'`, () => {
    const req: reqType = {
      headers: { authorization: 'Bearer actualTokenString' },
    }
    const token = authToken(<Request>req)

    expect(token).toBe('actualTokenString')
  })
})
