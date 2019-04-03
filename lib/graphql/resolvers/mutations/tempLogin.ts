import config from '../../../../lib/config'
import { v4 as uuid } from 'uuid'

export const tempLogin: any = async (_: any, _args: any, __: any) => {
  const sessionId = uuid()
  const loginRequestPayload = JSON.stringify({
    sessionId,
    // clientId: 'http://myskills-api:3000',
    clientId: config.DOMAIN,
  })

  const base64urlPayload = Buffer.from(loginRequestPayload)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return {
    url: `mydata://login/${base64urlPayload}`,
    sessionId,
  }
}
