import { Resolver } from '../../../../lib/server'

interface IAddLangaugeArgs {
  language: string
}

export const addLanguage: Resolver<IAddLangaugeArgs> = async (
  _,
  { language },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData<string>({
      area: Area.languages,
      data: language,
      token,
    })
  } catch (e) {
    console.log('addlanguage:', e)
  }
}
export default addLanguage
