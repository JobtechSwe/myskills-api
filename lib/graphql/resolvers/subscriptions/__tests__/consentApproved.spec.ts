import pubSub from '../../../../adapters/pubsub'
import { consentApproved } from '../consentApproved'

jest.mock('../../../../adapters/pubsub', () => ({
  asyncIterator: jest.fn(),
}))

test('subscribes to consent given', () => {
  const subscription = (consentApproved as any).subscribe()
  expect(pubSub.asyncIterator).toHaveBeenCalledWith(['Consent given'])
})
