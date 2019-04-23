import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const removeExperience: MutationResolvers['removeExperience'] = async (
  _,
  { id },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.removeData<Experience[]>({
      area: Area.experiences,
      id,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Remove experience error: ${e}`)
  }
}
