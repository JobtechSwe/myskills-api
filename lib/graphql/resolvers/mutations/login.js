const mydata = require('../../../adapters/operator')
const { DOMAIN: domain } = require('../../../config')

const defaultRequest = durationInSeconds => ({
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
  ],
  expiry: Math.round(Date.now() / 1000 + durationInSeconds),
})

module.exports = async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await mydata.consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}
