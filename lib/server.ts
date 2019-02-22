import config from './config'
import bodyParser from 'body-parser'
import express from 'express'
import schema from './graphql/schema'
import { ApolloServer } from 'apollo-server-express'
import { formatError } from 'apollo-errors'
import { RedisCache } from 'apollo-server-cache-redis'
import { onConsentApproved } from './services/consents'

import {
  getConsentRequest,
  saveConsent,
  saveConsentRequest,
} from './services/db'

import {
  connect as mydataConnect,
  routes as mydataRoutes,
  events as mydataEvents,
  saveData,
  getData,
} from './adapters/mydata'

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
  context: ({ req: { headers = {} } = {} }: any) => ({
    headers,
    mydata: {
      getData,
      saveData,
    },
  }),
})

server.applyMiddleware({
  app,
  path: '/graphql',
})

app.use(mydataRoutes)
mydataEvents.on('CONSENT_APPROVED', onConsentApproved)

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

export default {
  app: appInstance,
  server,
}
