import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const experience: MutationResolvers.ExperienceResolver = async (
  _,
  { experience },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Experience[]>({
      area: Area.experiences,
      data: [experience],
      token,
    })

    return result
  } catch (e) {
    throw new Error(`experience err: ${e}`)
  }
}
