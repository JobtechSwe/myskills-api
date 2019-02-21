const config = require('./config')
const bodyParser = require('body-parser')
const express = require('express')
const schema = require('./graphql/schema')
const {
  connect: mydataConnect,
  routes: mydataRoutes,
  events: mydataEvents,
  setData,
  getData,
} = require('./adapters/operator')
const { ApolloServer } = require('apollo-server-express')
const { formatError } = require('apollo-errors')
const { RedisCache } = require('apollo-server-cache-redis')
const {
  getConsentRequest,
  saveConsent,
  saveConsentRequest,
} = require('./services/db')

const app = express()
app.set('etag', 'strong')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Mydata mydataOperator approval route
app.get('/approved/:id', async (req, res, next) => {
  const result = await getConsentRequest(req.params.id)
  if (result) {
    res.send({
      accessToken: result.accessToken,
    })
  } else {
    res.sendStatus(404)
  }
})

const server = new ApolloServer({
  ...schema,
  formatError,
  cache: new RedisCache({
    host: config.REDIS_API_HOST,
    port: config.REDIS_API_PORT,
  }),
  context: ({ req: { headers } = {} }) => ({
    headers,
    mydata: {
      getData,
      setData,
    },
  }),
})

server.applyMiddleware({
  app,
  path: '/graphql',
})

app.use(mydataRoutes)
mydataEvents.on('CONSENT_APPROVED', async consent => {
  console.log('consent: ', consent)
  try {
    await saveConsent(consent)
    await saveConsentRequest(consent)
  } catch (e) {
    console.log('write error: ', e)
  }
})

/**
 * Start
 */
const port = config.SERVER_PORT

const appInstance = app
  .listen(port, () => {
    mydataConnect()
    console.log(`Listening on port: ${port}`)
  })
  .setTimeout(60000 * 20)

module.exports = {
  app: appInstance,
  server,
}
