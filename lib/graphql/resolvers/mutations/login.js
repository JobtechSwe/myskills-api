const { consents } = require('../../../adapters/operator')
const defaultRequest = require('../../../services/consents')

module.exports = async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}
