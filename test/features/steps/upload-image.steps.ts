import { defineFeature, loadFeature } from 'jest-cucumber'
import { getConsentedClient } from '../../integration/integrationUtils'
import server, { appIsReady } from '../../../lib/server'
import fs from 'fs'
const feature = loadFeature('./test/features/UploadImage.feature')
import { UPLOAD_IMAGE, IMAGE } from '../gql'
const TEST_ASSETS_FOLDER = `${process.cwd()}/test/assets`

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
      imagePath = `${TEST_ASSETS_FOLDER}/${imageString}.jpeg`
      const imageStream = fs.createReadStream(imagePath)
      const { data } = await mutate({
        mutation: UPLOAD_IMAGE,
        variables: {
          file: imageStream,
        },
      })
      smallImg = data.uploadImage
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

        expect(data.image).toBe(imageString)
      }
    )
  })

  test('Upload large image', ({ given, and, when, then }) => {
    let croppedImagePath
    let mutate, query, bigImage

    given('I have a bearer token', async () => {
      ;({ mutate, query } = await getConsentedClient(server))
    })

    when(
      /^I save an image that is larger than 200x200: "(.*)"$/,
      async imageString => {
        const imagePath = `${TEST_ASSETS_FOLDER}/${imageString}.jpeg`
        croppedImagePath = `${TEST_ASSETS_FOLDER}/cropped-${imageString}.jpeg`
        const imageStream = fs.createReadStream(imagePath)
        const { data } = await mutate({
          mutation: UPLOAD_IMAGE,
          variables: {
            file: imageStream,
          },
        })
        bigImage = data.uploadImage
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

      expect(data.image).toBe(croppedImage)
    })
  })
})
