import { Area } from '../../../types'
import { QueryResolvers } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const personalDescription: QueryResolvers['personalDescription'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<string>({
      token,
      area: Area.personalDescription,
    })

    return result
  } catch (e) {
    throw new Error(e)
  }
}
