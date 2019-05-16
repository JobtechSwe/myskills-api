import { MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const addPersonalDescription: MutationResolvers['addPersonalDescription'] = async (
  _,
  { body },
  { req, mydata }
): Promise<string> => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveData<string>({
      area: Area.personalDescription,
      data: body,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`trait error: ${e}`)
  }
}
