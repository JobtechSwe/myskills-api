import { Area } from '../../../types'
import { Experience, QueryResolvers } from '../../../__generated__/myskills'

export const getExperiences: QueryResolvers.GetEducationsResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.getData<Experience[]>({
      token,
      area: Area.experiences,
    })

    return result
  } catch (e) {
    throw new Error(e)
  }
}
