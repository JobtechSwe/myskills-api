import { GraphQLFieldResolver } from 'graphql'
import { mydataOperator } from '../../../adapters/mydata'
import { defaultRequest } from '../../../services/consents'

export const login: GraphQLFieldResolver<any, any, void> = async () => {
  const request = defaultRequest(3600 * 24 * 31)
  const pendingRequest = await mydataOperator.consents.request(request)

  console.log('pendingRequest:', pendingRequest)

  return pendingRequest
}

export default login
