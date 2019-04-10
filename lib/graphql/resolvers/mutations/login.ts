import { MutationResolvers } from '../../../__generated__/myskills'
import config from '../../../../lib/config'
import { v4 as uuid } from 'uuid'

export const login: MutationResolvers.LoginResolver = async (
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
