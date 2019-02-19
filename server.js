const bodyParser = require('body-parser')
const express = require('express')
const {
    ApolloServer
} = require('apollo-server-express')
const {
    errors,
} = reqdir('./middleware')
const schema = require('./graphql/schema')
const userProfile = require('./routes/userProfile')
const {
    formatError
} = require('apollo-errors')
const {
    RedisCache
} = require('apollo-server-cache-redis')
const mydataOperator = require('./adapters/operator')
const {
    getConsentRequest,
    saveConsent
} = require('./services/db')


const app = express()
app.set('etag', 'strong')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

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
        host: config.redisApi.host,
        port: config.redisApi.port,
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

/**
 * Error handling
 */
app.use(errors())

app.use(mydataOperator.routes)

mydataOperator.events.on('CONSENT_APPROVED', consent => {
    console.log('consent: ', consent)
    saveConsent(consent)
    // saveConsentRequest(consent)
})
/**
 * Start
 */
const {
    server: {
        port
    },
} = config

const appInstance = app
    .listen(port, () => {
        mydataOperator.connect()
        console.log(`Listening on port: ${port}`)
    })
    .setTimeout(60000 * 20)

module.exports = {
    app: appInstance,
    handleCors,
    server,
}
