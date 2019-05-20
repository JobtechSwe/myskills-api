import { QueryResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
export const traits: QueryResolvers['traits'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<string[]>({ token, area: Area.traits })
    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
