const auth = {
  read: jest.fn(),
  write: jest.fn(),
}

const mockOperator = {
  data: {
    auth: jest.fn(() => auth),
  },
}

export const create = jest.fn(() => mockOperator)
