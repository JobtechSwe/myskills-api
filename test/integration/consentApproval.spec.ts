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

const CONSENT_APPROVED = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

describe('consentApproval subscription', () => {
  const wait = (ms = 100) => new Promise(res => setTimeout(() => res(), ms))

  let client
  const consentResponse = jest.fn()
  const mockedConsentApprovalData = {
    consentApproved: {
      accessToken: '666',
    },
    consentRequestId: '123',
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
      query: CONSENT_APPROVED,
      variables: {
        consentRequestId: '123',
      },
    })

    client.subscribe({
      next: ({ data: { consentApproved } }) => {
        consentResponse(consentApproved)
      },
    })

    await wait()
  })

  beforeEach(async () => {
    ;(consentResponse as jest.Mock).mockClear()
  })

  afterAll(async () => await server.stop())

  it('resolves accessToken given matching consent request id', async () => {
    pubSub.publish('Consent given', mockedConsentApprovalData)
    await wait()
    expect(consentResponse).toHaveBeenCalledWith(
      expect.objectContaining({ accessToken: '666' })
    )
  })

  it('does not resolve accessToken given different consent request id', async () => {
    pubSub.publish('Consent given', {
      ...mockedConsentApprovalData,
      consentRequestId: '1234',
    })

    await wait()
    expect(consentResponse).not.toHaveBeenCalled()
  })
})
