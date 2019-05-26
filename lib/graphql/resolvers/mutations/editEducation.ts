import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

import authorizationToken from '../../../middleware/authorizationToken'

export const editEducation: MutationResolvers['editEducation'] = async (
  _,
  { education },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  console.log(education)
  try {
    const result = await mydata.updateData<Education>({
      token,
      area: Area.educations,
      newData: education,
      id: education.id,
    })
    return result
  } catch (e) {
    throw new Error(`Update education error: ${e}`)
  }
}
