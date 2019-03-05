import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const removeLanguage: MutationResolvers.RemoveLanguageResolver = async (
  _,
  { id },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.removeData<Language[]>({
      area: Area.languages,
      id,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`Remove anguage error: ${e}`)
  }
}
