import { RedisCache } from 'apollo-server-cache-redis'
import { Context } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import {
  connect as mydataConnect,
  events as mydataEvents,
  getData,
  IDataInput,
  ISaveDataInput,
  routes as mydataRoutes,
  saveData,
} from './adapters/mydata'
import config from './config'
import schema from './graphql/schema'
import { onConsentApproved } from './services/consents'
import { getConsentRequest } from './services/db'
import { GraphQLFieldResolver } from 'graphql'

export interface IApolloServerContext {
  headers: {
    token: string
  }
  mydata: {
    getData: typeof getData
    saveData: typeof saveData
  }
}

export type Resolver<Args = void, Parent = any> = GraphQLFieldResolver<
  Parent,
  IApolloServerContext,
  Args
>

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
  cache: new RedisCache({
    host: config.REDIS_API_HOST,
    port: config.REDIS_API_PORT,
  }),
  context: ({
    req: { headers = {} } = {},
  }: Context<any>): IApolloServerContext => ({
    headers,
    mydata: {
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
