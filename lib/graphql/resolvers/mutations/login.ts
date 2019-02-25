import { mydataOperator } from '../../../adapters/mydata'
import { defaultRequest } from '../../../services/consents'
import { MutationResolvers } from '../../../__generated__/myskills'

export const login: MutationResolvers.LoginResolver = async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await mydataOperator.consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}

export default login
