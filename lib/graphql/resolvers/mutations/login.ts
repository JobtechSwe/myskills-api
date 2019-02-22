import { mydataOperator } from '../../../adapters/mydata'
import defaultRequest from '../../../services/consents'

export default async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await mydataOperator.consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}
