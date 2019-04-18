import { MutationResolvers, ImgFile } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import sharp from 'sharp'

const MAX_WIDTH = 200
const MAX_HEIGHT = 200

async function streamToBuffer(file: any) {
  const bufferArray: Array<Buffer> = []

  file.on('readable', function() {
    let data
    while ((data = file.read())) {
      bufferArray.push(data)
    }
  })
  const buffer: Buffer = await new Promise(resolve =>
    file.on('end', () => resolve(Buffer.concat(bufferArray)))
  )

  return buffer
}

export const uploadImage: MutationResolvers.UploadImageResolver = async (
  _,
  { file },
  { req, mydata }
): Promise<ImgFile> => {
  try {
    const token = authorizationToken(req)
    let imageBuffer = await streamToBuffer(file)
    const {
      info: { width, height },
    } = await sharp(imageBuffer).toBuffer({ resolveWithObject: true })

    if (height > MAX_HEIGHT || width > MAX_WIDTH) {
      imageBuffer = await sharp(imageBuffer)
        .resize(MAX_WIDTH, MAX_HEIGHT)
        .toBuffer()
    }

    await mydata.saveData<ImgFile>({
      area: Area.image,
      data: { imageString: imageBuffer.toString('base64') },
      token,
    })

    return {
      imageString: imageBuffer.toString('base64'),
    }
  } catch (e) {
    throw new Error(`upload image error: ${e}`)
  }
}
