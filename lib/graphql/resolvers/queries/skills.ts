import { Area } from '../../../types'
import { QueryResolvers, Skill } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const skills: QueryResolvers['skills'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<Skill[]>({ token, area: Area.skills })

    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
