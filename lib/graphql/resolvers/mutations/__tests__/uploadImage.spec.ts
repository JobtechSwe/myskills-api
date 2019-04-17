import { uploadImage } from '../uploadImage'
import { ctx } from '../../../__mocks__/apolloServerContext'
import { Area } from '../../../../types'
import fs from 'fs'
import path from 'path'
describe('upload image', () => {
  let args, pathSmallImg
  beforeEach(() => {
    pathSmallImg = path.join(__dirname, 'person-small.jpeg')
    args = {
      file: fs.createReadStream(pathSmallImg),
    }
  })
  test.only('saves to myData if passes validation', async () => {
    await uploadImage({}, args, ctx as any, {} as any)
    const base64String = fs.readFileSync(pathSmallImg, {
      encoding: 'base64',
    })
    expect(ctx.mydata.saveData).toHaveBeenCalledWith({
      area: Area.image,
      data: base64String,
      token: 'token',
    })
  })
  test('resizes if image resolution is too big', async () => {})
  test('does not resize if resolution is within limits', async () => {})
  test('b0rks if not an image', async () => {})
  test('b0rks if no token', async () => {})
  test('returns base64 string', async () => {
    await uploadImage({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveData).toHaveBeenCalledWith({
      area: Area.image,
      data: [],
      token: 'token',
    })
  })
})
