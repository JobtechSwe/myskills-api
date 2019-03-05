import { create } from '@mydata/client'
import { getData, saveData } from '../../lib/adapters/mydata'
import config from '../../lib/config'
import { Area } from '../../lib/types'

jest.mock('@mydata/client')

describe('#operator', () => {
  let area: Area
  let data: { token: string }
  let token: string

  beforeEach(() => {
    area = Area.educations
    token = 'foobar'
    data = { token }
    ;(create({} as any).data.auth({} as any)
      .read as jest.Mock).mockResolvedValue({
      [config.DOMAIN]: {
        [area]: {
          data: [data],
        },
      },
    })
  })

  test('should get data', async () => {
    await expect(getData({ token, area })).resolves.toEqual([data])
  })

  test('should save data', async () => {
    await expect(saveData({ token, data, area })).resolves.toEqual(data)
  })

  test('should save data and return same data', async () => {
    ;(create({} as any).data.auth({} as any)
      .read as jest.Mock).mockResolvedValue({
      [config.DOMAIN]: {
        [area]: {
          data: null,
        },
      },
    })

    await expect(saveData({ data, token, area })).resolves.toEqual(data)
  })
})
