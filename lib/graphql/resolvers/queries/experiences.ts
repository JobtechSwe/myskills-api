import { Area } from '../../../types'
import { Experience, QueryResolvers } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const experiences: QueryResolvers['experiences'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<Experience[]>({
      token,
      area: Area.experiences,
    })

    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
