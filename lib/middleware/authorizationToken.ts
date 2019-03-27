import { Request } from 'express'
import { AuthenticationError } from 'apollo-server-express'

export default (req: Request) => {
  if (!req.headers.authorization) {
    return undefined
  }
  const auth = req.headers.authorization
  if (!auth.startsWith('Bearer')) {
    throw new AuthenticationError(
      'Authorization token malformed. Use "Bearer <token>"'
    )
  }

  return auth.replace('Bearer ', '')
}
