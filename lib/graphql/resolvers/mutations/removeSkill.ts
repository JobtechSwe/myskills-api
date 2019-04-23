import { Skill, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const removeSkill: MutationResolvers['removeSkill'] = async (
  _,
  { id },
  { req, mydata }
) => {
  const token = authorizationToken(req)
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
