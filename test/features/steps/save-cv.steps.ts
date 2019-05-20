import { defineFeature, loadFeature } from 'jest-cucumber'
import { getConsentedClient } from '../../integration/integrationUtils'
import server, { appIsReady } from '../../../lib/server'
import {
  SkillInput,
  EducationInput,
  ExperienceInput,
  ImgInput,
  OccupationInput,
} from '../../../lib/__generated__/myskills'
import { SAVE_CV, SKILLS } from '../gql'
import fs from 'fs'
const TEST_ASSETS_FOLDER = `${process.cwd()}/test/assets`

const feature = loadFeature('./test/features/SaveCV.feature')

defineFeature(feature, test => {
  beforeEach(async () => {
    await appIsReady
  })
  afterAll(async () => {
    await server.stop()
  })
  test('Save CV for the first time', ({ given, and, when, then }) => {
    let mutate: any
    let skillsInput: SkillInput[]
    let educationsInput: EducationInput[]
    let experiencesInput: ExperienceInput[]
    let occupationInput: OccupationInput
    let traitsInput: string[]
    let imageInput: ImgInput
    let personalDescriptionInput: string
    let result
    given('I have a bearer token', async () => {
      ;({ mutate } = await getConsentedClient(server))
    })
    and('I have this skills input:', (skills: SkillInput[]) => {
      skillsInput = skills
    })
    and('I have this education input:', (educations: EducationInput[]) => {
      educationsInput = educations
    })
    and('I have this experience input:', (experiences: ExperienceInput[]) => {
      experiencesInput = experiences
    })
    and('I have this traits input:', (traits: any[]) => {
      traitsInput = traits.map(t => t.trait)
    })
    and(
      /^I have personalDescription input "(.*)"$/,
      (personalDescription: string) => {
        personalDescriptionInput = personalDescription
      }
    )
    and(/^I have occupation input "(.*)"$/, (occupation: string) => {
      occupationInput = {
        term: occupation,
      }
    })
    and(/^I have the image "(.*)"$/, (image: string) => {
      const imagePath = `${TEST_ASSETS_FOLDER}/${image}.jpeg`
      imageInput = {
        imageString: fs.readFileSync(imagePath, {
          encoding: 'base64',
        }),
      }
    })
    when('I send the cv input to the save method', async () => {
      ;({
        data: { saveCV: result },
      } = await mutate({
        mutation: SAVE_CV,
        variables: {
          skills: skillsInput,
          educations: educationsInput,
          experiences: experiencesInput,
          occupation: occupationInput,
          personalDescription: personalDescriptionInput,
          traits: traitsInput,
          image: imageInput,
        },
      }))
    })

    then('I will receive back what has been stored by this operation', () => {
      expect(result).toBeTruthy()
    })
    and('I will see the skills input under the skills section', () => {
      const { skills } = result
      expect(skills).toEqual(skillsInput)
    })
    and('I will see the education input under the educations section', () => {
      const { educations } = result
      const expectedResult = educationsInput.map(education => ({
        id: expect.any(String),
        ...education,
      }))
      expect(educations).toEqual(expectedResult)
    })
    and('I will see the experience input under the experiences section', () => {
      const { experiences } = result
      expect(experiences).toEqual(experiencesInput)
    })

    and('I will see the traits input under the traits section', () => {
      const { traits } = result
      expect(traits).toEqual(traitsInput)
    })

    and(
      'I will see the personalDescription input under the personalDescription section',
      () => {
        const { personalDescription } = result
        expect(personalDescription).toEqual(personalDescriptionInput)
      }
    )

    and('I will see the occupation input under the occupations section', () => {
      const { occupation } = result
      expect(occupation).toEqual(occupationInput)
    })
    and(
      'I will receive the image that has been stored by this operation',
      () => {
        const { image } = result
        expect(image).toBe(imageInput.imageString)
      }
    )
  })

  test('Update the CV', ({ given, and, when, then }) => {
    let mutate: any
    let query: any
    let skillsInput: SkillInput[]
    let result

    given('I have a bearer token', async () => {
      ;({ query, mutate } = await getConsentedClient(server))
    })

    and('I have a stored CV with these skills:', async skills => {
      await mutate({
        mutation: SAVE_CV,
        variables: {
          skills,
        },
      })
    })

    and('I have this skills input:', (skills: SkillInput[]) => {
      skillsInput = skills
    })

    when('I send the cv input to the save method', async () => {
      ;({
        data: { saveCV: result },
      } = await mutate({
        mutation: SAVE_CV,
        variables: {
          skills: skillsInput,
        },
      }))
    })

    then('I will receive back what has been stored by this operation', () => {
      expect(result).toBeTruthy()
      expect(result).toHaveProperty('skills', skillsInput)
    })

    and(
      'I will see these skills when I query for skills:',
      async expectedSkills => {
        const {
          data: { skills },
        } = await query({
          query: SKILLS,
        })

        expect(skills).toEqual(expectedSkills)
      }
    )
  })
})
