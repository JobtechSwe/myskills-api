import { Area } from '../../../types'
import { Education, QueryResolvers } from '../../../__generated__/myskills'

export const getEducations: QueryResolvers.GetEducationsResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Education[]>({ token, area: Area.educations })

export default getEducations
