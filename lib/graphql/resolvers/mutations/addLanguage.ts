import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'

export const addLanguage: MutationResolvers.AddLanguageResolver = async (
  _,
  { language },
  { token, mydata }
) => {
  try {
    const result = await mydata.saveDataList<Language>({
      area: Area.languages,
      data: language,
      token,
    })

    return result
  } catch (e) {
    throw new Error(`language: ${e}`)
  }
}
