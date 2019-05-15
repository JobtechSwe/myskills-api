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
      educations: [
        {
          taxonomyId: '123456789',
          term: 'High school',
        },
      ],
      experiences: [
        {
          taxonomyId: 'taxonomyId1',
          term: 'Carpenter',
          years: '29',
        },
      ],
      occupation: {
        term: 'Snickare',
      },
    },
  }

  ctx.mydata.saveDataList.mockReset()
  // ctx.mydata.saveData.mockReset()
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
      data: [{ id: expect.any(String), ...args.cv.educations[0] }],
      token: 'token',
    })
  })

  test('does not call save method when list is empty', async () => {
    args.cv.educations = []
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.educations })
    )
  })

  test('does not call save method when list is null', async () => {
    args.cv.educations = null
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.educations })
    )
  })

  test('does not call save method when list is undefined', async () => {
    args.cv.educations = undefined
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
      data: [{ id: expect.any(String), ...args.cv.experiences[0] }],
      token: 'token',
    })
  })

  test('does not call save method when list is empty', async () => {
    args.cv.experiences = []
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.experiences })
    )
  })

  test('does not call save method when list is null', async () => {
    args.cv.experiences = null
    await saveCV({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveDataList).not.toHaveBeenCalledWith(
      expect.objectContaining({ area: Area.experiences })
    )
  })

  test('does not call save method when list is undefined', async () => {
    args.cv.experiences = undefined
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
      .mockResolvedValueOnce(args.cv.educations)
      .mockResolvedValueOnce(args.cv.experiences)
    ctx.mydata.saveData.mockResolvedValueOnce(args.cv.occupation)

    const result = await saveCV({}, args, ctx as any, {} as any)
    expect(result).toEqual({
      skills: [
        {
          term: 'Developer',
          taxonomyId: 'someTaxonomyId',
          type: 'skill',
        },
      ],
      educations: [
        {
          taxonomyId: '123456789',
          term: 'High school',
        },
      ],
      experiences: [
        {
          taxonomyId: 'taxonomyId1',
          term: 'Carpenter',
          years: '29',
        },
      ],
      occupation: {
        term: 'Snickare',
      },
    })
  })

  test('handles errors and rejects them nice', async () => {
    ctx.mydata.saveDataList.mockRejectedValue('err')

    await expect(saveCV({}, args, ctx as any, {} as any)).rejects.toThrow('err')
  })
})
