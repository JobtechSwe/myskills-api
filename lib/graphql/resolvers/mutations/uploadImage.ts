import { MutationResolvers, ImgFile } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import { resizeImage } from '../../../utils/image'

export const uploadImage: MutationResolvers['uploadImage'] = async (
  _,
  { image: { imageString } },
  { req, mydata }
): Promise<string> => {
  try {
    const token = authorizationToken(req)
    const resizedImage = await resizeImage({ imageString })

    await mydata.saveData<ImgFile>({
      area: Area.image,
      data: { imageString: resizedImage },
      token,
    })

    return resizedImage
  } catch (e) {
    throw new Error(`upload image error: ${e}`)
  }
}
