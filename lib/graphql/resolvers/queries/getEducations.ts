import { Resolver } from '../../../../lib/server'

export const getEducations: Resolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Education[]>({ token, area: Area.educations })

export default getEducations
