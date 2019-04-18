import { Area } from '../../../types'
import { QueryResolvers, ImgFile } from '../../../__generated__/myskills'
import authorizationToken from '../../../middleware/authorizationToken'

export const image: QueryResolvers.ImageResolver = async (
  _,
  _args,
  { req, mydata }
) => {
  const token = authorizationToken(req)
  try {
    const result = await mydata.getData<ImgFile>({
      token,
      area: Area.image,
    })

    return result.imageString
  } catch (e) {
    throw new Error(e)
  }
}
