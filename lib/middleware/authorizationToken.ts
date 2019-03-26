import { Request, Response, NextFunction } from 'express'

export default (req: Request, _res: Response, next: NextFunction) => {
  req.token = undefined
  if (!req.headers.authorization) {
    return next()
  }
  const auth = req.headers.authorization
  if (!auth.startsWith('Bearer')) {
    throw Error('Authorization token malformed. Use "Bearer <token>"')
  }
  req.token = auth.replace('Bearer ', '')
  next()
}
