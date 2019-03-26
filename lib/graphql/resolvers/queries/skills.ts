import { Area } from '../../../types'
import { QueryResolvers, Skill } from '../../../__generated__/myskills'

export const skills: QueryResolvers.SkillsResolver = async (
  _,
  _args,
  { token, mydata }
) => {
  try {
    const result = await mydata.getData<Skill[]>({ token, area: Area.skills })

    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
