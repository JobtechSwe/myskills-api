import { ctx } from '../../../__mocks__/apolloServerContext'
import { saveCV } from '../saveCV'
import { Area } from '../../../../types'

let args

beforeEach(() => {
  args = {
    cv: {
      skills: [
        {
          name: 'Developer',
          taxonomyId: 'someTaxonomyId',
          term: '',
          type: 'skill',
        },
      ],
      education: [
        {
          taxonomyId: '123456789',
          name: 'High school',
        },
      ],
      experience: [
        {
          taxonomyId: 'taxonomyId1',
          name: 'Carpenter',
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
