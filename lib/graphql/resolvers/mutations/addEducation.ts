import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const addEducation: MutationResolvers.AddEducationResolver = async (
  _,
  { education },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Education>({
      area: Area.educations,
      data: education,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Add education error: ${e}`)
  }
}
