import { MutationResolvers, Skill } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import { v4 as uuid } from 'uuid'

export const addSkill: MutationResolvers.AddSkillResolver = async (
  _,
  { skill },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Skill[]>({
      area: Area.skills,
      data: [{ id: uuid(), ...skill }],
      token,
    })

    return result
  } catch (e) {
    throw new Error(`skill error: ${e}`)
  }
}
