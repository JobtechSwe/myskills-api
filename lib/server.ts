import { RedisCache } from 'apollo-server-cache-redis'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import {
  connect as mydataConnect,
  consents,
  events as mydataEvents,
  getData,
  routes as mydataRoutes,
  saveData,
} from './adapters/mydata'
import config from './config'
import schema from './graphql/schema'
import { onConsentApproved } from './services/consents'
import { getConsentRequest } from './services/db'

const app = express()
app.set('etag', 'strong')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Mydata mydataOperator approval route
app.get('/approved/:id', async (req, res) => {
  const result = await getConsentRequest<{ accessToken: string }>(req.params.id)

  if (result) {
    res.send({
      accessToken: result.accessToken,
    })
  } else {
    res.sendStatus(404)
  }
})

const server = new ApolloServer({
  cache: new RedisCache({
    host: config.REDIS_API_HOST,
    port: config.REDIS_API_PORT,
  }),
  context: ({ req: { headers = {} } = {} }) => ({
    headers,
    mydata: {
      consents,
      getData,
      saveData,
    },
  }),
  ...schema,
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
