import { Area } from '../../../types'
import { Language, QueryResolvers } from '../../../__generated__/myskills'

export const languages: QueryResolvers.LanguagesResolver = async (
  _,
  _args,
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.getData<Language[]>({
      token,
      area: Area.languages,
    })

    return result || []
  } catch (e) {
    throw new Error(e)
  }
}
