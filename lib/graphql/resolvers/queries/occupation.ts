import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import { QueryResolvers, Occupation } from 'lib/__generated__/myskills'

export const occupation: QueryResolvers['occupation'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<Occupation>({
      token,
      area: Area.occupation,
    })

    return result || {}
  } catch (e) {
    throw new Error(e)
  }
}
