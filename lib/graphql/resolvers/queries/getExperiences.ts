import { Resolver } from '../../../../lib/server'

export const getExperiences: Resolver = async (
  _,
  args,
  { headers: { token }, mydata }
) => mydata.getData<Experience>({ token, area: Area.experiences })

export default getExperiences
