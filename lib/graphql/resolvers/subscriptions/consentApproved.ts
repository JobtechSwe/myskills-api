import { withFilter } from 'apollo-server-express'
import pubSub, { CONSENT_GIVEN } from '../../../adapters/pubsub'

export const consentApproved = {
  subscribe: withFilter(
    () => pubSub.asyncIterator([CONSENT_GIVEN]),
    ({ consentRequestId }, args) => consentRequestId === args.consentRequestId
  ),
}
