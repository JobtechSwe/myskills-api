import { Education, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import { v4 as uuid } from 'uuid'

export const addEducation: MutationResolvers.AddEducationResolver = async (
  _,
  { education },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Education[]>({
      area: Area.educations,
      data: [{ id: uuid(), ...education }],
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Add education error: ${e}`)
  }
}
