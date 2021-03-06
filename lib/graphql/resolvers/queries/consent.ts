import { Consent, QueryResolvers } from '../../../__generated__/myskills'
import { defaultRequest } from '../../../services/consents'

export const consent: QueryResolvers['consent'] = async (
  _,
  _args,
  { mydata }
) => {
  try {
    const request = defaultRequest(3600 * 24 * 31)
    const pendingRequest = await mydata.consents.request<Consent>(request)

    return pendingRequest
  } catch (e) {
    throw new Error(e)
  }
}
