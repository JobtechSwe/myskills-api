import { Language, MutationResolvers } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const removeLanguage: MutationResolvers['removeLanguage'] = async (
  _,
  { language },
  { req, mydata }
) => {
  const token = authorizationToken(req)
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
