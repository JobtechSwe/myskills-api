import { WebSocketLink } from 'apollo-link-ws'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gql } from 'apollo-server-express'
import WebSocket from 'ws'
import pubSub from '../../lib/adapters/pubsub'
import server, { appIsReady } from '../../lib/server'

Object.assign(global, {
  WebSocket,
})

const LOGIN_APPROVED = gql`
  subscription loginApproved($loginRequestId: String!) {
    loginApproved(loginRequestId: $loginRequestId) {
      accessToken
    }
  }
`

describe('loginApproval subscription', () => {
  const wait = (ms = 100) => new Promise(res => setTimeout(() => res(), ms))

  let client
  const loginResponse = jest.fn()
  const mockedLoginApprovalData = {
    loginApproved: {
      accessToken: '666',
    },
    loginRequestId: '123',
  }
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:${process.env.SERVER_PORT}/graphql`,
    reconnect: true,
    webSocketImpl: WebSocket,
  })

  beforeAll(async () => {
    await appIsReady

    client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    }).subscribe({
      query: LOGIN_APPROVED,
      variables: {
        loginRequestId: '123',
      },
    })

    client.subscribe({
      next: ({ data: { loginApproved } }) => {
        loginResponse(loginApproved)
      },
    })

    await wait()
  })

  beforeEach(async () => {
    ;(loginResponse as jest.Mock).mockClear()
  })

  afterAll(async () => await server.stop())

  it('resolves accessToken given matching login request id', async () => {
    pubSub.publish('Login consent given', mockedLoginApprovalData)

    await wait()

    expect(loginResponse).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: '666' })
    )
  })

  it('does not resolve accessToken given different login request id', async () => {
    pubSub.publish('Login consent given', {
      ...mockedLoginApprovalData,
      loginRequestId: '1234',
    })

    await wait()

    expect(loginResponse).not.toHaveBeenCalled()
  })
})
