import { Area } from '../../../types'
import { Education, QueryResolvers } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const educations: QueryResolvers.EducationsResolver = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<Education[]>({
      token,
      area: Area.educations,
    })

    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
