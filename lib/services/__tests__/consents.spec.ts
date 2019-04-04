import { defaultRequest, onConsentApproved, onLoginApproved } from '../consents'
import MockDate from 'mockdate'
import { saveConsent, saveConsentRequest } from '../db'
import pubSub from '../../adapters/pubsub'
jest.mock('../../config', () => ({ DOMAIN: 'myskills-api-domain' }))

jest.mock('../db', () => ({
  saveConsent: jest.fn(),
  saveConsentRequest: jest.fn(),
}))

jest.mock('../../adapters/pubsub', () => ({
  publish: jest.fn(),
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
    accessToken: '123',
  }

  test('saves consent', async () => {
    await onConsentApproved(consent)

    expect(saveConsent).toHaveBeenCalledWith(consent)
  })

  test('saves consent request', async () => {
    await onConsentApproved(consent)

    expect(saveConsentRequest).toHaveBeenCalledWith(consent)
  })

  test('publishes access token to apollo subscription/pubsub', async () => {
    const mockedpubSubData = {
      consentApproved: {
        accessToken: consent.accessToken,
      },
      consentRequestId: consent.consentRequestId,
    }
    await onConsentApproved(consent)

    expect(pubSub.publish).toHaveBeenCalledWith(
      'Consent given',
      mockedpubSubData
    )
  })

  test('throw when something goes wrong', async () => {
    ;(saveConsent as jest.Mock).mockRejectedValue('Err')

    await expect(onConsentApproved(consent)).rejects.toThrow(
      'Error in ConsentApproved: Err'
    )
  })
})

describe('#onLoginApproved', () => {
  const consent = {
    accessToken: '123',
    sessionId: '321',
  }

  const mockedpubSubData = {
    loginApproved: {
      accessToken: consent.accessToken,
    },
    loginRequestId: consent.sessionId,
  }

  test('publishes access token to apollo subscription/pubsub', () => {
    onLoginApproved(consent)
    expect(pubSub.publish).toHaveBeenCalledWith(
      'Login consent given',
      mockedpubSubData
    )
  })

  test('throw when something goes wrong', async () => {
    ;(pubSub.publish as jest.Mock).mockRejectedValue('Err')

    await expect(onConsentApproved(consent)).rejects.toThrow(
      'Error in ConsentApproved: Err'
    )
  })
})
