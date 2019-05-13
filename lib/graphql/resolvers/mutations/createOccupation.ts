import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import { MutationResolvers, Occupation } from 'lib/__generated__/myskills'

export const createOccupation: MutationResolvers['createOccupation'] = async (
  _,
  { occupation },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveData<Occupation>({
      area: Area.occupation,
      data: occupation,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`occupation: ${e}`)
  }
}
