import { defaultRequest, onConsentApproved } from '../consents'
import MockDate from 'mockdate'
import { saveConsent, saveConsentRequest } from '../db'

jest.mock('../db', () => ({
  saveConsent: jest.fn(),
  saveConsentRequest: jest.fn(),
}))

afterAll(MockDate.reset)

describe('#defaultRequest', () => {
  MockDate.set('2019-02-26T09:27:59.942Z')

  test('it creates a default consent', () => {
    expect(defaultRequest(3600)).toMatchSnapshot()
  })
})

describe('#onConsentApproved', () => {
  const consent = {
    consentId: '1337',
    consentRequestId: '1338',
  }

  test('saves consent', async () => {
    await onConsentApproved(consent)

    expect(saveConsent).toHaveBeenCalledWith(consent)
  })

  test('saves consent request', async () => {
    await onConsentApproved(consent)

    expect(saveConsentRequest).toHaveBeenCalledWith(consent)
  })

  test('throw when something goes wrong', async () => {
    ;(saveConsent as jest.Mock).mockRejectedValue('Err')

    await expect(onConsentApproved(consent)).rejects.toThrow('err')
  })
})
