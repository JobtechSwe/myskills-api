import { withFilter } from 'apollo-server-express'
import pubSub from '../../../adapters/pubsub'
import { SubscriptionMessage } from '../../../types'
import { SubscriptionResolvers } from '../../../__generated__/myskills'

export const consentApproved: SubscriptionResolvers.ConsentApprovedResolver = {
  subscribe: withFilter(
    () => pubSub.asyncIterator([SubscriptionMessage.CONSENT_GIVEN]),
    ({ consentRequestId }, args) => consentRequestId === args.consentRequestId
  ),
}
