import { MutationResolvers, ImgFile } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import sharp from 'sharp'

const MAX_WIDTH = 200
const MAX_HEIGHT = 200

export const uploadImage: MutationResolvers['uploadImage'] = async (
  _,
  { image: { imageString } },
  { req, mydata }
): Promise<ImgFile> => {
  console.log(imageString)
  try {
    const token = authorizationToken(req)
    const imageBuffer = Buffer.from(imageString, 'base64')
    const { height = 0, width = 0 } = await sharp(imageBuffer).metadata()

    if (height > MAX_HEIGHT || width > MAX_WIDTH) {
      const resizedBuffer = await sharp(imageBuffer)
        .resize(MAX_WIDTH, MAX_HEIGHT)
        .toBuffer()

      imageString = resizedBuffer.toString('base64')
    }

    await mydata.saveData<ImgFile>({
      area: Area.image,
      data: { imageString },
      token,
    })

    return {
      imageString,
    }
  } catch (e) {
    throw new Error(`upload image error: ${e}`)
  }
}
