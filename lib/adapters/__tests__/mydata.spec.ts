import { removeData, saveData } from '../mydata'
import { Area } from '../../types'
import { auth } from '../../../__mocks__/@mydata/client'

describe('#saveData', () => {
  test('should add data to array if array', async () => {
    auth.read.mockResolvedValue({
      'http://host.docker.internal:3000': {
        languages: { data: ['swedish', 'spanish'] },
      },
    })

    const args = {
      area: Area.languages,
      data: ['english'],
      token: 'token',
    }

    const result = await saveData(args)

    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { data: ['swedish', 'spanish', 'english'] },
      })
    )

    expect(result).toEqual(['swedish', 'spanish', 'english'])
  })

  test('that it creates a new array if no existing and input data is array', async () => {
    auth.read.mockResolvedValue({
      'http://host.docker.internal:3000': {
        languages: { data: null },
      },
    })

    const args = {
      area: Area.languages,
      data: ['english'],
      token: 'token',
    }

    const result = await saveData(args)

    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { data: ['english'] },
      })
    )

    expect(result).toEqual(['english'])
  })

  test('should replace object if object', async () => {
    auth.read.mockResolvedValue({
      'http://host.docker.internal:3000': {
        profile: {
          data: {
            id: '12345',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      },
    })

    const args = {
      area: Area.profile,
      data: {
        id: '12345',
        firstName: 'Jane',
        lastName: 'Doe',
      },
      token: 'token',
    }

    const result = await saveData(args)

    expect(auth.write).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          data: {
            id: '12345',
            firstName: 'Jane',
            lastName: 'Doe',
          },
        },
      })
    )

    expect(result).toEqual({
      id: '12345',
      firstName: 'Jane',
      lastName: 'Doe',
    })
  })
})

describe('#removeData', () => {
  test('it should remove a language', async () => {
    auth.read.mockResolvedValue({
      'http://host.docker.internal:3000': {
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
      'http://host.docker.internal:3000': {
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
      'http://host.docker.internal:3000': {
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
