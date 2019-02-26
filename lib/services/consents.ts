import config from '../config'
import { Area } from '../types'
import { saveConsent, saveConsentRequest } from './db'

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
  description:
    'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
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
  ],
})

const onConsentApproved = async (consent: any) => {
  try {
    await saveConsent(consent)
    await saveConsentRequest(consent)
  } catch (e) {
    console.log('write error: ', e)
  }
}

export { defaultRequest, onConsentApproved }
