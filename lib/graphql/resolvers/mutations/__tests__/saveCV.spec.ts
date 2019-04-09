import { ctx } from '../../../__mocks__/apolloServerContext'
import { saveCV } from '../saveCV'
import { Area } from '../../../../types'

let args

beforeEach(() => {
  args = {
    cv: {
      skills: [
        {
          taxonomyId: 'someTaxonomyId',
          term: 'Developer',
          type: 'skill',
        },
      ],
      education: [
        {
          taxonomyId: '123456789',
          term: 'High school',
        },
      ],
      experience: [
        {
          taxonomyId: 'taxonomyId1',
          term: 'Carpenter',
          years: '29',
        },
      ],
    },
  }

  ctx.mydata.saveDataList.mockReset()
})

describe('save skills list', () => {
  test('saves when there are values', async () => {
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).toHaveBeenCalledWith({
      area: Area.skills,
      data: [{ id: expect.any(String), ...args.cv.skills[0] }],
      token: 'token',
    })
  })

  test('does not call save method when list is empty', async () => {
    args.cv.skills = []
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.skills })
    )
  })

  test('does not call save method when list is null', async () => {
    args.cv.skills = null
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.skills })
    )
  })

  test('does not call save method when list is undefined', async () => {
    args.cv.skills = undefined
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.skills })
    )
  })
})

describe('save education list', async () => {
  test('saves when there are values', async () => {
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).toHaveBeenCalledWith({
      area: Area.educations,
      data: [{ id: expect.any(String), ...args.cv.education[0] }],
      token: 'token',
    })
  })

  test('does not call save method when list is empty', async () => {
    args.cv.education = []
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.educations })
    )
  })

  test('does not call save method when list is null', async () => {
    args.cv.education = null
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.educations })
    )
  })

  test('does not call save method when list is undefined', async () => {
    args.cv.education = undefined
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.educations })
    )
  })
})

describe('save experience list', async () => {
  test('saves when there are values', async () => {
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).toHaveBeenCalledWith({
      area: Area.experiences,
      data: [{ id: expect.any(String), ...args.cv.experience[0] }],
      token: 'token',
    })
  })

  test('does not call save method when list is empty', async () => {
    args.cv.experience = []
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.experiences })
    )
  })

  test('does not call save method when list is null', async () => {
    args.cv.experience = null
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.experiences })
    )
  })

  test('does not call save method when list is undefined', async () => {
    args.cv.experience = undefined
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.experiences })
    )
  })
})

describe('result', () => {
  test('returns a CV object', async () => {
    ctx.mydata.saveDataList
      .mockResolvedValueOnce(args.cv.skills)
      .mockResolvedValueOnce(args.cv.education)
      .mockResolvedValueOnce(args.cv.experience)

    const result = await saveCV({}, args, ctx as any, {} as any)
    expect(result).toEqual({
      skills: [
        {
          term: 'Developer',
          taxonomyId: 'someTaxonomyId',
          type: 'skill',
        },
      ],
      education: [
        {
          taxonomyId: '123456789',
          term: 'High school',
        },
      ],
      experience: [
        {
          taxonomyId: 'taxonomyId1',
          term: 'Carpenter',
          years: '29',
        },
      ],
    })
  })

  test('handles errors and rejects them nice', async () => {
    ctx.mydata.saveDataList.mockRejectedValue('err')

    await expect(saveCV({}, args, ctx as any, {} as any)).rejects.toThrow('err')
  })
})
