import { defaultRequest } from '../../../services/consents'
import { Login, MutationResolvers } from '../../../__generated__/myskills'

export const login: MutationResolvers.LoginResolver = async (
  _,
  _args,
  { mydata }
) => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await mydata.consents.request<Login>(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}

export default login
