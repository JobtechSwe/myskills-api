import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const addExperience: MutationResolvers.AddExperienceResolver = async (
  _,
  { experience },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData<Experience>({
      area: Area.experiences,
      data: experience,
      token,
    })
  } catch (e) {
    throw new Error(`addExperience err: ${e}`)
  }
}

export default addExperience
