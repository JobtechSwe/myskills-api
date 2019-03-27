import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const removeEducation: MutationResolvers.RemoveEducationResolver = async (
  _,
  { id },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.removeData<Education[]>({
      area: Area.educations,
      id,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Remove education error: ${e}`)
  }
}
