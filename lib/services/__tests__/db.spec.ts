import redis from '../../adapters/redis'
import {
  getConsent,
  getConsentRequest,
  saveConsent,
  saveConsentRequest,
} from '../db'

jest.mock('../../adapters/redis')

const consent = {
  consentId: '1337',
  consentRequestId: '1338',
}

describe('#saveConsent', () => {
  test('save a stringified consent', () => {
    saveConsent(consent)

    expect(redis.set).toHaveBeenCalledWith(
      'consentId:1337',
      JSON.stringify(consent)
    )
  })
})

describe('#getConsent', () => {
  test('gets a consent with data', async () => {
    ;(redis.get as jest.Mock).mockResolvedValue('{ "consent": true }')

    const result = await getConsent('1337')

    expect(redis.get).toHaveBeenCalledWith('consentId:1337')
    expect(result).toEqual({
      consent: true,
    })
  })

  test('gets a consent without data', async () => {
    ;(redis.get as jest.Mock).mockResolvedValue(null)

    const result = await getConsent('1337')

    expect(redis.get).toHaveBeenCalledWith('consentId:1337')
    expect(result).toEqual({})
  })
})

describe('#saveConsentRequest', () => {
  test('save a stringified consent', () => {
    saveConsentRequest(consent)

    expect(redis.set).toHaveBeenCalledWith(
      'consentRequestId:1338',
      JSON.stringify(consent)
    )
  })
})

describe('#getConsentRequest', () => {
  test('gets a consent without data', async () => {
    ;(redis.get as jest.Mock).mockResolvedValue('{ "consent": true }')

    const result = await getConsentRequest('1338')

    expect(redis.get).toHaveBeenCalledWith('consentRequestId:1338')
    expect(result).toEqual({
      consent: true,
    })
  })

  test('gets a consent without data', async () => {
    ;(redis.get as jest.Mock).mockResolvedValue(null)

    const result = await getConsentRequest('1338')

    expect(redis.get).toHaveBeenCalledWith('consentRequestId:1338')
    expect(result).toEqual({})
  })
})
