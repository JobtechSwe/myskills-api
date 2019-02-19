const mydata = require('../../../adapters/operator')

const defaultRequest = (durationInSeconds) => ({
    scope: [{
        domain: 'http://localhost:3000',
        area: 'myskills',
        description: 'A list of your work experiences, educations, language proficiencies and so on that you have entered in the service.',
        permissions: ['write'],
        purpose: 'In order to create a CV using our website.',
        lawfulBasis: 'CONSENT',
    }, ],
    expiry: Math.round(Date.now() / 1000 + durationInSeconds),
})

module.exports = async () => {
    const request = defaultRequest(3600 * 24 * 31 * 1000)
    const pendingRequest = await mydata.consents.request(request)

    console.log('pendingRequest:', pendingRequest)

    return pendingRequest
}
