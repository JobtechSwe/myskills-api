import { QueryResolvers } from '../../../__generated__/myskills'
import config from '../../../config'
import { v4 as uuid } from 'uuid'

export const getLoginUrl: QueryResolvers['getLoginUrl'] = async (
  _,
  _args,
  _context
) => {
  const sessionId = uuid()

  const loginRequestPayload = JSON.stringify({
    sessionId,
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
