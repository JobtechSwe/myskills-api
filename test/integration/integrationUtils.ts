import got from 'got'
import { consents } from '../../lib/adapters/mydata'
import { Consent } from '../../lib/__generated__/myskills'
import { defaultRequest } from '../../lib/services/consents'
import { getConsentRequest } from '../../lib/services/db'
import { createTestClient } from 'apollo-server-testing'

const MYDATA_APP_URL = process.env.MYDATA_APP || 'http://127.0.0.1:1337'
export interface options {
  context: any
}

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
  try {
    await createMyDataAccount()
    const request = defaultRequest(3600 * 24 * 31)
    const { url, id } = await consents.request<Consent>(request)
    await approveConsent(url)
    const { accessToken } = await getConsentRequest(id)
    console.log('accessTOken: ', accessToken)

    return getClient(server, {
      context: {
        req: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      },
    })
  } catch (error) {
    console.error(
      'Error when setting up integration tests consented client.',
      error
    )
  }
}

const createMyDataAccount = (
  firstName: string = 'Gordon',
  lastName: string = 'Freeman'
) => {
  return got(`${MYDATA_APP_URL}/createAccount`, {
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

const approveConsent = async consentRequestUrl => {
  try {
    const {
      body: { data },
    } = await got(`${MYDATA_APP_URL}/getConsentRequest`, {
      json: true,
      method: 'post',
      body: {
        args: consentRequestUrl,
      },
    })

    return got(`${MYDATA_APP_URL}/approveConsentRequest`, {
      json: true,
      method: 'post',
      body: {
        args: {
          data,
        },
      },
    })
  } catch (e) {
    throw Error(`ApproveConsentIntegrationTest: ${JSON.stringify(e, null, 2)}`)
  }
}
