import config from '../config'
import { Area, SubscriptionMessage } from '../types'
import { saveConsent, saveConsentRequest } from './db'
import { Consent, Login } from '@mydata/client'
import pubSub from '../adapters/pubsub'

export interface Scope {
  area: Area
  description: string
  domain: string
  lawfulBasis: string
  permissions: string[]
  purpose: string
}

export interface DefaultRequest {
  expiry: number
  scope: Scope[]
}

const createConsent = (area: Area) => ({
  area,
  description: `${area} that you have entered in the service.`,
  domain: config.DOMAIN,
  lawfulBasis: 'CONSENT',
  permissions: ['write'],
  purpose: 'In order to create a CV using our website.',
})

const defaultRequest = (durationInSeconds: number): DefaultRequest => ({
  expiry: Math.round(Date.now() / 1000 + durationInSeconds),
  scope: [
    createConsent(Area.languages),
    createConsent(Area.educations),
    createConsent(Area.experiences),
    createConsent(Area.occupation),
    createConsent(Area.skills),
    createConsent(Area.profile),
    createConsent(Area.image),
  ],
})

const onConsentApproved = async (payload: Consent) => {
  try {
    await saveConsent(payload)
    await saveConsentRequest(payload)

    pubSub.publish(SubscriptionMessage.CONSENT_GIVEN, {
      consentApproved: {
        accessToken: payload.accessToken,
      },
      consentRequestId: payload.consentRequestId,
    })
  } catch (e) {
    throw new Error(`Error in ConsentApproved: ${e}`)
  }
}

const onLoginApproved = (payload: Login) => {
  /**
   * TODO(@all): Should we save these?
   * */
  try {
    pubSub.publish(SubscriptionMessage.LOGIN_CONSENT_GIVEN, {
      loginApproved: {
        accessToken: payload.accessToken,
      },
      loginRequestId: payload.sessionId,
    })
  } catch (e) {
    throw new Error(`Error in LoginApproved: ${e}`)
  }
}

export { defaultRequest, onConsentApproved, onLoginApproved }
