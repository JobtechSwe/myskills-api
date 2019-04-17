import { defineFeature, loadFeature } from 'jest-cucumber'
import { getConsentedClient } from '../../integration/integrationUtils'
import server, { appIsReady } from '../../../lib/server'
import fs from 'fs'
const feature = loadFeature('./test/features/SaveImg.feature')
import { UPLOAD_IMAGE, IMAGE } from '../gql'
defineFeature(feature, test => {
  beforeEach(async () => {
    await appIsReady
  })
  afterAll(async () => {
    await server.stop()
  })
  test('Upload image', ({ given, and, when, then }) => {
    let smallImg, imagePath, mutate, query
    given('I have a bearer token', async () => {
      ;({ mutate, query } = await getConsentedClient(server))
    })

    when(/^I save the image "(.*)"$/, async imageString => {
      imagePath = `${process.cwd()}/test/assets/${imageString}.jpeg`
      const imageStream = fs.createReadStream(imagePath)
      console.log('imageStream:', imageStream)
      const { data, errors } = await mutate({
        mutation: UPLOAD_IMAGE,
        variables: {
          file: imageStream,
        },
      })
      console.log('errors:', errors)
      smallImg = data.uploadImage
      console.log('data:', data.uploadImage)
    })

    then(
      'I will receive the image that has been stored by this operation',
      () => {
        const expectedImgString = fs.readFileSync(imagePath, {
          encoding: 'base64',
        })
        expect(smallImg.imageString).toBe(expectedImgString)
      }
    )

    and(
      'When I query for it I will receive the image as base64 string',
      async () => {
        const { data } = await query({
          query: IMAGE,
        })
        const imageString = fs.readFileSync(imagePath, { encoding: 'base64' })
        console.log('imageString:', imageString)
        expect(data.imageString).toBe(imageString)
      }
    )
  })

  test('Upload large image', ({ given, and, when, then }) => {
    const croppedImagePath =
      process.cwd() + '/test/assets/cropped-otherperson.jpeg'
    let mutate, query, bigImage
    given('I have a bearer token', async () => {
      ;({ mutate, query } = await getConsentedClient(server))
    })

    when(
      /^I save an image that is larger than 800x600: "(.*)"$/,
      async imageString => {
        const imagePath = `${process.cwd()}/test/assets/${imageString}.jpeg`
        const imageStream = fs.createReadStream(imagePath)
        console.log('imageStream:', imageStream)
        const { data, errors } = await mutate({
          mutation: UPLOAD_IMAGE,
          variables: {
            file: imageStream,
          },
        })
        console.log('errors:', errors)
        bigImage = data.uploadImage
        console.log('data:', data.uploadImage)
      }
    )

    then(
      'I will receive the cropped image that has been stored by this operation',
      () => {
        const croppedImage = fs.readFileSync(croppedImagePath, {
          encoding: 'base64',
        })
        expect(bigImage.imageString).toBe(croppedImage)
      }
    )

    and('I will see the picture under the picture section', async () => {
      const { data } = await query({
        query: IMAGE,
      })
      const croppedImage = fs.readFileSync(croppedImagePath, {
        encoding: 'base64',
      })
      expect(data.imageString).toBe(croppedImage)
    })
  })
})
