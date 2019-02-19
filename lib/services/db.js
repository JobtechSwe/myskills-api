const redis = require('../adapters/redis')

const consentPrefix = 'consentId:'
const consentRequestPrefix = 'consentRequestId:'

module.exports = {
  saveConsent: consent =>
    redis.set(`${consentPrefix}${consent.consentId}`, JSON.stringify(consent)),
  getConsent: async id => {
    const data = await redis.get(`${consentPrefix}${id}`)
    return JSON.parse(data)
  },
  saveConsentRequest: consent =>
    redis.set(
      `${consentRequestPrefix}${consent.consentRequestId}`,
      JSON.stringify(consent)
    ),
  getConsentRequest: async id => {
    const data = await redis.get(`${consentRequestPrefix}${id}`)
    return JSON.parse(data)
  },
}
