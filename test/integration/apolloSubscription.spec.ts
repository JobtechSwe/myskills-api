import { gql } from 'apollo-server-express'
import server, { appIsReady } from '../../lib/server'
import { getConsentedClient } from './integrationUtils'
import WebSocket from 'ws'
import { withFilter } from 'apollo-server-express'
import { SubscriptionMessage } from '../../lib/types'
import pubSub from '../../lib/adapters/pubsub'
import { onConsentApproved } from '../../lib/services/consents'
import {
  SubscriptionClient,
  OperationMessage,
  SubscriptionServer,
} from 'subscriptions-transport-ws'
import { $$asyncIterator } from 'iterall'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
const GRAPHQL_WS_ENDPOINT = `ws://localhost:${process.env.SERVER_PORT}/graphql`
// const GRAPHQL_WS_ENDPOINT = `ws://localhost:3000/graphql`

const CONSENT_APPROVED = gql`
  subscription consentApproved($consentRequestId: String!) {
    consentApproved(consentRequestId: $consentRequestId) {
      accessToken
    }
  }
`

// TODO
// Setup server with ws connection
// register subscription server
// register subscription client
// subscribe
// resolve

describe('Apollo subscriptions', () => {
  let networkInterface
  let subscriptionServer
  let query: any

  beforeAll(async () => {
    await appIsReady
    await getConsentedClient(server)

    // const httpLink = createHttpLink({
    //   uri: `http://localhost:${process.env.SERVER_PORT}/graphql`,
    //   fetch,
    // })
    // const link = httpLink
    // const client = new ApolloClient({
    //   link,
    //   cache: new InMemoryCache(),
    // })
  })

  beforeEach(async () => {})

  // afterAll(async () => await server.stop())

  it('subscribes to message', async () => {
    networkInterface = new SubscriptionClient(
      GRAPHQL_WS_ENDPOINT,
      { reconnect: true },
      WebSocket
    )
    networkInterface.onError(error => {
      console.log('error: ', error)
    })
    // await subscriptionClient
    //   .request({
    //     query: CONSENT_APPROVED,
    //     operationName: 'consentApproved',
    //     variables: {
    //       consentRequestId: '123',
    //     },
    //   })
    //   .subscribe({
    //     next: (result: any) => {
    //       console.log(result)
    //     },
    //     error: err => {
    //       console.log(err)
    //     },
    //     [$$asyncIterator]() {
    //       return this
    //     },
    //   })
    // pubSub.publish('Consent given', { bla: 'bla' })
  })
  xit('resolves message with data', () => {})
  xit('does not resolve if cosentrequestid does not match', () => {})
})
