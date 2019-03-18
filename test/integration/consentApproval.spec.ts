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

describe('apollo subscriptions', () => {
  const wait = new Promise(res => setTimeout(() => res(), 500))

  let client
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
  })

  beforeEach(() => {
    client = new ApolloClient({
      link: wsLink,
      cache: new InMemoryCache(),
    }).subscribe({
      query: CONSENT_APPROVED,
      variables: {
        consentRequestId: '123',
      },
    })
  })

  afterEach(() => {
    client = null
  })

  afterAll(async () => await server.stop())

  it('resolves accessToken given matching consent request id', done => {
    client.subscribe({
      next: ({ data: { consentApproved } }) => {
        expect(consentApproved.accessToken).toEqual('666')

        done()
      },
    })

    setTimeout(
      () => pubSub.publish('Consent given', mockedConsentApprovalData),
      100
    )
  })

  it('does not resolve accessToken given different consent request id', async done => {
    let approvalCount = 0

    client.subscribe({
      next: ({ data: { consentApproved } }) => {
        approvalCount++
        done()
      },
    })

    setTimeout(() => {
      pubSub.publish('Consent given', {
        ...mockedConsentApprovalData,
        consentRequestId: '123',
      })
    }, 100)

    await wait
    expect(approvalCount).toEqual(0)
    done()
  })
})
