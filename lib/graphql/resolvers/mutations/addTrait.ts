import { MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const addTrait: MutationResolvers['addTrait'] = async (
  _,
  { trait },
  { req, mydata }
): Promise<string> => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveData<string>({
      area: Area.traits,
      data: trait,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`trait error: ${e}`)
  }
}
