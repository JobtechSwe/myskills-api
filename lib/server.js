require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mydataOperator = require('./adapters/operator')
const {
    ApolloServer
} = require('apollo-server-express')
const schema = require('./graphql/schema')
const {
    formatError
} = require('apollo-errors')
const {
    RedisCache
} = require('apollo-server-cache-redis')
const {
    getConsentRequest,
    saveConsent,
    saveConsentRequest
} = require('./services/db')

const app = express()
app.set('etag', 'strong')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Mydata operator approval route
app.get('/approved/:id', async (req, res, next) => {
    const result = getConsentRequest(req.params.id)
    if (result) {
        res.send({
            accessToken: result.accessToken
        })
    } else {
        res.sendStatus(404)
    }
})

const server = new ApolloServer({
    ...schema,
    formatError,
    cache: new RedisCache({
        host: process.env.REDIS_API_HOST,
        port: process.env.REDIS_API_PORT,
    }),
    context: ({
        req: {
            headers
        } = {}
    }) => ({
        headers
    }),
})

server.applyMiddleware({
    app,
    path: '/graphql'
})

app.use(mydataOperator.routes)

mydataOperator.events.on('CONSENT_APPROVED', consent => {
    console.log('consent: ', consent)
    saveConsent(consent)
    saveConsentRequest(consent)
})

/**
 * Start
 */
const port = process.env.SERVER_PORT

const appInstance = app
    .listen(port, () => {
        mydataOperator.connect()
        console.log(`Listening on port: ${port}`)
    })
    .setTimeout(60000 * 20)

module.exports = {
    app: appInstance,
    server,
}
