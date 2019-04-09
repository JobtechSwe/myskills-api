import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const addLanguage: MutationResolvers['addLanguage'] = async (
  _,
  { language },
  { req, mydata }
) => {
  const token = authorizationToken(req)
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
