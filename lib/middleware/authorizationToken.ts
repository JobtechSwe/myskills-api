import { Request } from 'express'
import { AuthenticationError } from 'apollo-server-express'

export default (req: Request): string => {
  if (!req.headers.authorization) {
    throw new AuthenticationError(
      `Authorization token missing. Please add header "Authorization: Bearer <token>"`
    )
  }
  const auth = req.headers.authorization
  if (!auth.startsWith('Bearer')) {
    throw new AuthenticationError(
      'Authorization token malformed. Use "Bearer <token>"'
    )
  }

  return auth.replace('Bearer ', '')
}
