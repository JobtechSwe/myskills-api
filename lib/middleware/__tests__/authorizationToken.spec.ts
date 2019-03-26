import authToken from '../authorizationToken'
import { Request } from 'express'

describe('authorizationToken', () => {
  type reqType = { token?: string; headers: { authorization?: string } }
  let next: jest.Mock<any, any>

  beforeEach(() => {
    next = jest.fn()
  })

  test('throws error if AuthorizationToken does not start with Bearer', () => {
    const req: reqType = {
      headers: {
        authorization: 'Basic actualTokenString',
      },
    }

    expect(() => {
      authToken(<Request>req, null, next)
    }).toThrow()
    expect(next).not.toBeCalled()
  })

  test('sets token to undefined if no Authorization is set', () => {
    const req: reqType = {
      headers: {},
      token: 'fakeToken',
    }
    authToken(<Request>req, null, next)

    expect(req.token).toBe(undefined)
  })

  test(`sets token to whatever follows 'Bearer'`, () => {
    const req: reqType = {
      headers: { authorization: 'Bearer actualTokenString' },
      token: 'something differnt',
    }
    authToken(<Request>req, null, next)

    expect(req.token).toBe('actualTokenString')
  })
})
