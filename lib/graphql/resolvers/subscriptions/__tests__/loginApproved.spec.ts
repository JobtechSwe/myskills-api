import pubSub from '../../../../adapters/pubsub'
import { loginApproved } from '../loginApproved'

jest.mock('../../../../adapters/pubsub', () => ({
  asyncIterator: jest.fn(),
}))

test('subscribes to login consent given', () => {
  const subscription = (loginApproved as any).subscribe()
  expect(pubSub.asyncIterator).toHaveBeenCalledWith(['Login consent given'])
})
