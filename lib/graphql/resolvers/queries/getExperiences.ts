import { Resolver } from '../../../../lib/server'

export const getExperiences: Resolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Experience>({ token, area: Area.experiences })

export default getExperiences
