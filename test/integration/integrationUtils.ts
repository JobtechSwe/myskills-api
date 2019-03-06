import got from 'got'

const E2E_SIMULATOR_URL = 'http://e2e-simulator:1337'
import { consents } from '../../lib/adapters/mydata'
import { Login } from '../../lib/__generated__/myskills'
import { defaultRequest } from '../../lib/services/consents'
import { getConsentRequest } from '../../lib/services/db'

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

export const getConsentedClient = async (
  server
): Promise<{ query: Function; mutate: Function }> => {
  await createMyDataAccount()
  const request = defaultRequest(3600 * 24 * 31)
  const { id } = await consents.request<Login>(request)
  await approveConsent(id)
  const { accessToken } = await getConsentRequest(id)

  return getClient(server, {
    context: {
      headers: {
        token: accessToken,
      },
    },
  })
}

const createMyDataAccount = (
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
  })
}

const approveConsent = async consentRequestId => {
  const {
    body: { data },
  } = await got(`${E2E_SIMULATOR_URL}/getConsentRequest`, {
    json: true,
    method: 'post',
    body: {
      args: consentRequestId,
    },
  })

  return got(`${E2E_SIMULATOR_URL}/approveConsentRequest`, {
    json: true,
    method: 'post',
    body: {
      args: {
        data,
      },
    },
  })
}
