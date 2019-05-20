import { uploadImage } from '../uploadImage'
import { ctx } from '../../../__mocks__/apolloServerContext'
import { Area } from '../../../../types'
import fs from 'fs'

declare global {
  namespace jest {
    interface Expect {
      toBeSmallerThan(a: string): any
    }
  }
}

expect.extend({
  toBeSmallerThan(receivedBuffer: string, compareBuffer: string) {
    if (compareBuffer.length > receivedBuffer.length) {
      return {
        pass: true,
        message: () =>
          `expected ${receivedBuffer.length} not to be smaller than ${
            compareBuffer.length
          }`,
      }
    } else {
      return {
        pass: false,
        message: () =>
          `expected ${receivedBuffer.length} to be smaller than ${
            compareBuffer.length
          }`,
      }
    }
  },
})

describe('upload image', () => {
  let args, smallImgPath, largeImgPath
  beforeEach(() => {
    smallImgPath = process.cwd() + '/test/assets/person-small.jpeg'
    largeImgPath = process.cwd() + '/test/assets/otherperson-large.jpeg'
    args = {
      image: {
        imageString: fs.readFileSync(smallImgPath, {
          encoding: 'base64',
        }),
      },
    }
  })

  test('calls myData resized if image resolution is too big', async () => {
    args.image.imageString = fs.readFileSync(largeImgPath, {
      encoding: 'base64',
    })
    const orgBase64Str = fs.readFileSync(largeImgPath, {
      encoding: 'base64',
    })

    await uploadImage({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveData).toHaveBeenLastCalledWith({
      area: Area.image,
      data: { imageString: expect.toBeSmallerThan(orgBase64Str) },
      token: 'token',
    })
  })

  test('calls myData uncropped if resolution is within limits', async () => {
    const base64String = fs.readFileSync(smallImgPath, {
      encoding: 'base64',
    })

    await uploadImage({}, args, ctx as any, {} as any)

    expect(ctx.mydata.saveData).toHaveBeenCalledWith({
      area: Area.image,
      data: { imageString: base64String },
      token: 'token',
    })
  })

  test('returns base64 string', async () => {
    const imageString = await uploadImage({}, args, ctx as any, {} as any)

    expect(imageString.substring(imageString.length - 1)).toBe('=')
  })

  test('handles errors and rejects them nice', async () => {
    ctx.mydata.saveData.mockRejectedValue('err')

    await expect(uploadImage({}, args, ctx as any, {} as any)).rejects.toThrow(
      'err'
    )
  })
})
