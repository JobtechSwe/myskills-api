import { Experience, QueryResolvers } from '../../../__generated__/myskills'

export const getExperiences: QueryResolvers.GetEducationsResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Experience[]>({ token, area: Area.experiences })

export default getExperiences
