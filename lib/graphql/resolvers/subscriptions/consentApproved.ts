// import { withFilter } from 'apollo-server-express'
import { pubsub } from '../../../server'

const MESSAGE = 'Consent given'

export const consentApproved = {
  subscribe: () => pubsub.asyncIterator([MESSAGE]),
}
