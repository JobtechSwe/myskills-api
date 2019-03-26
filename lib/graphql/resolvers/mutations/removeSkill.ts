import { Skill, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const removeSkill: MutationResolvers.RemoveSkillResolver = async (
  _,
  { id },
  { token, mydata }
) => {
  try {
    const result = await mydata.removeData<Skill[]>({
      area: Area.skills,
      id,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Remove skill error: ${e}`)
  }
}
