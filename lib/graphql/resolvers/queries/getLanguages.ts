import { Language, QueryResolvers } from '../../../__generated__/myskills'

export const getLanguages: QueryResolvers.GetLanguagesResolver = (
  _,
  _args,
  { headers: { token }, mydata }
) => mydata.getData<Language[]>({ token, area: Area.languages })

export default getLanguages
