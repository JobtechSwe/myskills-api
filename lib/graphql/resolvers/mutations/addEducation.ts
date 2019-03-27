import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import { v4 as uuid } from 'uuid'
import authorizationToken from '../../../middleware/authorizationToken'

export const addEducation: MutationResolvers.AddEducationResolver = async (
  _,
  { education },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveDataList<Education>({
      area: Area.educations,
      data: { id: uuid(), ...education },
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Add education error: ${e}`)
  }
}
