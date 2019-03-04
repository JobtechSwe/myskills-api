import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const language: MutationResolvers.LanguageResolver = async (
  _,
  { language },
  { headers: { token }, mydata }
) => {
  try {
    const result = await mydata.saveData<Language[]>({
      area: Area.languages,
      data: [language],
      token,
    })

    return result
  } catch (e) {
    throw new Error(`language: ${e}`)
  }
}
