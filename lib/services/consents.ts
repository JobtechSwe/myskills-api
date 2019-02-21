const { DOMAIN: domain } = require('../config')

const defaultRequest = (durationInSeconds: number) => ({
  scope: [
    {
      domain,
      area: 'languages',
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
      lawfulBasis: 'CONSENT',
    },
    {
      domain,
      area: 'educations',
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
      lawfulBasis: 'CONSENT',
    },
    {
      domain,
      area: 'experiences',
      description:
        'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
      lawfulBasis: 'CONSENT',
    },
    {
      domain,
      area: 'skills',
      description:
        'A list of your work skills, educations, language proficiencies and so on that you have entered in the service.',
      permissions: ['write'],
      purpose: 'In order to create a CV using our website.',
      lawfulBasis: 'CONSENT',
    },
  ],
  expiry: Math.round(Date.now() / 1000 + durationInSeconds),
})

module.exports = defaultRequest
