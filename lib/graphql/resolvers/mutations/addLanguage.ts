import { Language, MutationResolvers } from '../../../__generated__/myskills'

export const addLanguage: MutationResolvers.AddLanguageResolver = async (
  _,
  { language },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData<Language>({
      area: Area.languages,
      data: language,
      token,
    })
  } catch (e) {
    throw new Error(`addlanguage: ${e}`)
  }
}
export default addLanguage
