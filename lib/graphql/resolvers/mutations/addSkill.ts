import { MutationResolvers, Skill } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const addSkill: MutationResolvers.AddSkillResolver = async (
  _,
  { skill },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Skill[]>({
      area: Area.skills,
      data: [skill],
      token,
    })

    return result
  } catch (e) {
    throw new Error(`skill error: ${e}`)
  }
}
