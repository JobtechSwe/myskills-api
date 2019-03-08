import { Login, MutationResolvers } from '../../../__generated__/myskills'
import { defaultRequest } from '../../../services/consents'
export const login: MutationResolvers.LoginResolver = async (
  _,
  _args,
  { mydata, pubsub }
) => {
  try {
    const request = defaultRequest(3600 * 24 * 31)
    const pendingRequest = await mydata.consents.request<Login>(request)
    await pubsub.publish('Consent request was made', pendingRequest)

    return pendingRequest
  } catch (e) {
    throw new Error(e)
  }
}
