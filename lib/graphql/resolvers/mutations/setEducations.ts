import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import { v4 as uuid } from 'uuid'
import authorizationToken from '../../../middleware/authorizationToken'

export const setEducations: MutationResolvers['setEducations'] = async (
  _,
  { educations },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveDataList<Education[]>({
      area: Area.educations,
      data: educations.map(education =>
        education.hasOwnProperty('id')
          ? education
          : { ...education, id: uuid() }
      ),
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Set education error: ${e}`)
  }
}
