import config from '../config'
import { Area } from '../types'
import { saveConsent, saveConsentRequest } from './db'
import { Consent } from '@mydata/client'

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
    createConsent(Area.skills),
    createConsent(Area.profile),
  ],
})

const onConsentApproved = async (consent: Consent) => {
  console.log('consent: ', consent)
  try {
    await saveConsent(consent)
    await saveConsentRequest(consent)
  } catch (e) {
    throw new Error(`write error: ${e}`)
  }
}

export { defaultRequest, onConsentApproved }
