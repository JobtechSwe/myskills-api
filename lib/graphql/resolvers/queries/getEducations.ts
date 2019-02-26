import { Area } from '../../../types'
import { Education, QueryResolvers } from '../../../__generated__/myskills'

export const getEducations: QueryResolvers.GetEducationsResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.getData<Education[]>({
      token,
      area: Area.educations,
    })

    return result
  } catch (e) {
    throw new Error(e)
  }
}
