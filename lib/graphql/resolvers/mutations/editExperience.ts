import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

import authorizationToken from '../../../middleware/authorizationToken'

export const editExperience: MutationResolvers['editExperience'] = async (
  _,
  { experience },
  { req, mydata }
) => {
  const token = authorizationToken(req)

  try {
    const result = await mydata.updateData<Experience>({
      token,
      area: Area.educations,
      newData: experience,
      id: experience.id,
    })
    return result
  } catch (e) {
    throw new Error(`Update experience error: ${e}`)
  }
}
