const redis = require('../adapters/redis')

const consentPrefix = 'consentId:'
const consentRequestPrefix = 'consentRequestId:'

export const saveConsent = consent =>
  redis.set(`${consentPrefix}${consent.consentId}`, JSON.stringify(consent))

export const getConsent = async id => {
  const data = await redis.get(`${consentPrefix}${id}`)
  return JSON.parse(data)
}

export const saveConsentRequest = consent =>
  redis.set(
    `${consentRequestPrefix}${consent.consentRequestId}`,
    JSON.stringify(consent)
  )

export const getConsentRequest = async id => {
  const data = await redis.get(`${consentRequestPrefix}${id}`)
  return JSON.parse(data)
}
