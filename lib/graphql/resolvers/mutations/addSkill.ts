import { Resolver } from '../../../../lib/server'

interface IAddSkillArgs {
  skill: Skill
}

export const addSkill: Resolver<IAddSkillArgs> = async (
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
    console.log('addSkill error: ', e)
  }
}

export default addSkill
