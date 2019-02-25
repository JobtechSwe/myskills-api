import config from '../../lib/config'
import { Area } from '../../lib/types'

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

import { getData, saveData } from '../../lib/adapters/mydata'

describe('#operator', () => {
  let area: Area
  let data: { token: string }
  let token: string

  beforeEach(() => {
    area = Area.educations
    data = { token }
    token = 'foobar'

    authFunctions.read.mockResolvedValue({
      [config.DOMAIN]: {
        [area]: {
          data: [data],
        },
      },
    })
  })

  test('should get data', async () => {
    const result = await getData({ token, area })

    expect(result).toEqual([data])
  })

  test('should save data', async () => {
    const result = await saveData({ token, data, area })

    expect(result).toEqual([data])
  })
})
