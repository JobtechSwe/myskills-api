import { MutationResolvers, ImgFile } from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
// import sharp from 'sharp'

async function streamToBase64String(file: any) {
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
  return buffer.toString('base64')
}

export const uploadImage: MutationResolvers.UploadImageResolver = async (
  _,
  { file },
  { req, mydata }
): Promise<ImgFile> => {
  const token = authorizationToken(req)
  const imageString = await streamToBase64String(file)

  await mydata.saveData({
    area: Area.image,
    data: imageString,
    token,
  })

  return {
    imageString,
  }
}
