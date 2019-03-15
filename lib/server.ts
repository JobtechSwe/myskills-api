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
  removeData,
  saveDataList,
} from './adapters/mydata'
import config from './config'
import schema from './graphql/schema'
import { onConsentApproved } from './services/consents'
import { getConsentRequest } from './services/db'
import TaxonomyAPI from './adapters/taxonomy'

const app = express()
app.set('etag', 'strong')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/**
 * MyData - Approval Route
 */
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

app.use(mydataRoutes)
mydataEvents.on('CONSENT_APPROVED', onConsentApproved)

/**
 * GraphQL
 */
export const server = new ApolloServer({
  cache: new RedisCache({
    host: config.REDIS_API_HOST,
    port: config.REDIS_API_PORT,
    password: config.REDIS_API_PASSWORD,
  }),
  dataSources: () => ({
    taxonomyAPI: new TaxonomyAPI(),
  }),
  context: ({ req: { headers = {} } = {} }) => ({
    headers,
    mydata: {
      consents,
      getData,
      saveData,
      removeData,
      saveDataList,
    },
  }),
  ...schema,
})

server.applyMiddleware({
  app,
  path: '/graphql',
})

/**
 * Start
 */

const port = config.SERVER_PORT

export const appIsReady: Promise<Boolean> = new Promise(resolve =>
  app.listen(port, async () => {
    await mydataConnect()

    console.log(`Listening on port: ${port}`)
    resolve(true)
  })
)

export default server
