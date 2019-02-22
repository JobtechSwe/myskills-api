const { consents } = require('../../../adapters/mydata')
const defaultRequest = require('../../../services/consents')

export default async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}
