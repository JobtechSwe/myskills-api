import { Area } from '../../../types'
import { QueryResolvers, Profile } from '../../../__generated__/myskills'

export const profile: QueryResolvers.ProfileResolver = async (
  _,
  _args,
  { token, mydata }
) => {
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
