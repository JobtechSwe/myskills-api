import { MutationResolvers, Profile } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const createProfile: MutationResolvers.CreateProfileResolver = async (
  _,
  { profile },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.saveData<Profile>({
      area: Area.profile,
      data: profile,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Profile err: ${e}`)
  }
}
