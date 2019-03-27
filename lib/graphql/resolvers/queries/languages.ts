import { Area } from '../../../types'
import { Language, QueryResolvers } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const languages: QueryResolvers.LanguagesResolver = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
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
