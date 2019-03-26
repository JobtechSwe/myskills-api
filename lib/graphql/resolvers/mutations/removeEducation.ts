import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const removeEducation: MutationResolvers.RemoveEducationResolver = async (
  _,
  { id },
  { token, mydata }
) => {
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
