import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const removeExperience: MutationResolvers.RemoveExperienceResolver = async (
  _,
  { id },
  { token, mydata }
) => {
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
