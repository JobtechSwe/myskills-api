const { DOMAIN } = require(`${process.cwd()}/lib/config`)

const authFunctions = {
  read: jest.fn(),
  write: jest.fn(),
}

const mockOperator = {
  data: {
    auth: () => authFunctions,
  },
}

jest.mock('@mydata/client', () => ({
  create: () => mockOperator,
}))

const operator = require(`${process.cwd()}/lib/adapters/operator`)

describe('#operator', () => {
  let area, data, education, token

  beforeEach(() => {
    area = 'education'
    data = { token }
    token = 'foobar'

    authFunctions.read.mockResolvedValue({
      [DOMAIN]: {
        [area]: {
          data: [data],
        },
      },
    })
  })

  test('should get data', async () => {
    const result = await operator.getData({ token, area })

    expect(result).toEqual([data])
  })

  test('should save data', async () => {
    const result = await operator.saveData({ token, data, area })

    expect(result).toEqual([data])
  })
})
