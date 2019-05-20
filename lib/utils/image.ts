import sharp from 'sharp'

interface ResizeImageProps {
  imageString: string
  MAX_HEIGHT?: number
  MAX_WIDTH?: number
}

export const resizeImage = async ({
  imageString,
  MAX_HEIGHT = 200,
  MAX_WIDTH = 200,
}: ResizeImageProps) => {
  const imageBuffer = Buffer.from(imageString, 'base64')

  const { height = 0, width = 0 } = await sharp(imageBuffer).metadata()

  if (height > MAX_HEIGHT || width > MAX_WIDTH) {
    const resizedBuffer = await sharp(imageBuffer)
      .resize(MAX_WIDTH, MAX_HEIGHT)
      .toBuffer()

    return resizedBuffer.toString('base64')
  }

  return imageString
}
