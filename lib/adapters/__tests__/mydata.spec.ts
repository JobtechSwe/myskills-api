import { removeData } from '../mydata'
import { Area } from '../../types'
import { auth } from '../../../__mocks__/@mydata/client'

describe('#removeData', () => {
  test('it should remove a language', async () => {
    auth.read.mockResolvedValue({
      'http://localhost:3000': {
        languages: { data: ['swedish', 'spanish'] },
      },
    })

    const args = {
      area: Area.languages,
      id: 'swedish',
      key: '',
      token: 'token',
    }

    const result = await removeData(args)
    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({ data: { data: ['spanish'] } })
    )

    expect(result).toBe(true)
  })

  test('it should remove an education', async () => {
    auth.read.mockResolvedValue({
      'http://localhost:3000': {
        educations: {
          data: [
            { id: '1', name: 'Kindergarden' },
            { id: '2', name: 'University' },
          ],
        },
      },
    })

    const args = {
      area: Area.educations,
      id: '1',
      token: 'token',
    }

    const result = await removeData(args)
    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { data: [{ id: '2', name: 'University' }] },
      })
    )

    expect(result).toBe(true)
  })

  test('it should remove profile', async () => {
    auth.read.mockResolvedValue({
      'http://localhost:3000': {
        profile: {
          data: {
            firstName: 'Simon',
            lastName: 'Lassekongosson',
          },
        },
      },
    })

    const args = {
      area: Area.profile,
      id: '',
      token: 'token',
    }

    const result = await removeData(args)
    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { data: null },
      })
    )
    expect(result).toBe(true)
  })
})
