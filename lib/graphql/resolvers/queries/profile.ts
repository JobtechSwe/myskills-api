import { Area } from '../../../types'
import { QueryResolvers, Profile } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const profile: QueryResolvers['profile'] = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<Profile>({
      token,
      area: Area.profile,
    })

    return result || {}
  } catch (e) {
    throw new Error(e)
  }
}
