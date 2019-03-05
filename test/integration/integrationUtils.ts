import got from 'got'

const E2E_SIMULATOR_URL = 'http://localhost:1337'

export interface options {
  context: any
}

import { createTestClient } from 'apollo-server-testing'

export const getClient = (
  server,
  options?: options
): { query: Function; mutate: Function } => {
  if (options && options.context) {
    // @ts-ignore
    const context = server.context({})

    // @ts-ignore
    server.context = () => ({
      ...context,
      ...options.context,
    })
  }

  const client = createTestClient(server)

  return { mutate: client.mutate, query: client.query }
}

export const createMyDataAccount = (
  firstName: string = 'Gordon',
  lastName: string = 'Freeman'
) => {
  return got(`${E2E_SIMULATOR_URL}/createAccount`, {
    method: 'post',
    json: true,
    body: {
      args: {
        firstName,
        lastName,
      },
    },
  }).then(data => data.body.id)
}

export const approveConsent = async consentRequestId => {
  const {
    body: { data },
  } = await got(`${E2E_SIMULATOR_URL}/getConsentRequest`, {
    json: true,
    method: 'post',
    body: {
      args: consentRequestId,
    },
  })
  const hej = await got(`${E2E_SIMULATOR_URL}/approveConsentRequest`, {
    json: true,
    method: 'post',
    body: {
      args: {
        data,
      },
    },
  })
}
