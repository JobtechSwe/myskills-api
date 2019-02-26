import { Area } from '../../../types'
import { QueryResolvers, Skill } from '../../../__generated__/myskills'

export const getSkills: QueryResolvers.GetSkillsResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Skill[]>({ token, area: Area.skills })

export default getSkills
