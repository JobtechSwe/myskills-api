import { Experience, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import { v4 as uuid } from 'uuid'

export const addExperience: MutationResolvers.AddExperienceResolver = async (
  _,
  { experience },
  { token, mydata }
) => {
  try {
    const result = await mydata.saveDataList<Experience>({
      area: Area.experiences,
      data: { id: uuid(), ...experience },
      token,
    })

    return result
  } catch (e) {
    throw new Error(`experience err: ${e}`)
  }
}
