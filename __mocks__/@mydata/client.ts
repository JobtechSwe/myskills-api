const auth = {
  read: jest.fn(),
  write: jest.fn(),
}

const mockOperator = {
  data: {
    auth: jest.fn(() => auth),
  },
  routes: jest.fn(() => true),
  events: {
    on: jest.fn(),
  },
  connect: jest.fn(),
}

export const create = jest.fn(() => mockOperator)
