import redis from '../adapters/redis'

const consentPrefix = 'consentId:'
const consentRequestPrefix = 'consentRequestId:'

export const saveConsent = (consent: any) =>
  redis.set(`${consentPrefix}${consent.consentId}`, JSON.stringify(consent))

export const getConsent = async (id: string) => {
  const data = await redis.get(`${consentPrefix}${id}`)
  return JSON.parse(data || '')
}

export const saveConsentRequest = (consent: any) =>
  redis.set(
    `${consentRequestPrefix}${consent.consentRequestId}`,
    JSON.stringify(consent)
  )

export const getConsentRequest = async <T = any>(id: string): Promise<T> => {
  const data = await redis.get(`${consentRequestPrefix}${id}`)
  return JSON.parse(data || '')
}
