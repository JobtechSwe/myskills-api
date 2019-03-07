import { getConsentRequest } from '../../../services/db'
import { QueryResolvers } from '../../../__generated__/myskills'

export const approved: QueryResolvers.ApprovedResolver = async (_, { id }) => {
  try {
    const result = await getConsentRequest<{ accessToken: string }>(id)
    if (!result || !result.accessToken) {
      throw new Error('Cannot find approved consent')
    }

    return { accessToken: result.accessToken }
  } catch (e) {
    throw new Error(e)
  }
}
