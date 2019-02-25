import { Resolver } from '../../../../lib/server'

export const getLanguages: Resolver = (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<string[]>({ token, area: Area.languages })

export default getLanguages
