import config from '../config'
import { saveConsent, saveConsentRequest } from './db'

export interface IScope {
  area: Area
  description: string
  domain: string
  lawfulBasis: string
  permissions: string[]
  purpose: string
}
export interface IDefaultRequest {
  expiry: number
  scope: IScope[]
}

const defaultRequest = (durationInSeconds: number): IDefaultRequest => ({
  expiry: Math.round(Date.now() / 1000 + durationInSeconds),
  scope: [
    {
      area: Area.languages,
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      domain: config.DOMAIN,
      lawfulBasis: 'CONSENT',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
    },
    {
      area: Area.educations,
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      domain: config.DOMAIN,
      lawfulBasis: 'CONSENT',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
    },
    {
      area: Area.experiences,
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      domain: config.DOMAIN,
      lawfulBasis: 'CONSENT',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
    },
    {
      area: Area.skills,
      description:
        'A list of your work skills, educations, language proficiencies and so on that you have entered in the service.',
      domain: config.DOMAIN,
      lawfulBasis: 'CONSENT',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
    },
  ],
})

const onConsentApproved = async (consent: any) => {
  console.log('consent: ', consent)
  try {
    await saveConsent(consent)
    await saveConsentRequest(consent)
  } catch (e) {
    console.log('write error: ', e)
  }
}

export { defaultRequest, onConsentApproved }
