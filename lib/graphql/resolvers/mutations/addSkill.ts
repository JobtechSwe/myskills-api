import { MutationResolvers, Skill } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const addSkill: MutationResolvers.AddSkillResolver = async (
  _,
  { skill },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData<Skill>({
      area: Area.skills,
      data: skill,
      token,
    })
  } catch (e) {
    throw new Error(`addSkill error: ${e}`)
  }
}

export default addSkill
