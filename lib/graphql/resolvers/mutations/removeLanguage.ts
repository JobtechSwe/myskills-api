import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const removeLanguage: MutationResolvers.RemoveLanguageResolver = async (
  _,
  { language },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.removeData<Language[]>({
      area: Area.languages,
      id: language,
      key: '',
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Remove language error: ${e}`)
  }
}
