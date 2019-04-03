import { withFilter } from 'apollo-server-express'
import pubSub from '../../../adapters/pubsub'
import { SubscriptionMessage } from '../../../types'
import { SubscriptionResolvers } from '../../../__generated__/myskills'

export const loginApproved: SubscriptionResolvers.LoginApprovedResolver = {
  subscribe: withFilter(
    () => pubSub.asyncIterator([SubscriptionMessage.LOGIN_CONSENT_GIVEN]),
    ({ loginRequestId }, args) => loginRequestId === args.loginRequestId
  ),
}
