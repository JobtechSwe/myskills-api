import { defineFeature, loadFeature } from 'jest-cucumber'
import { getConsentedClient } from '../../integration/integrationUtils'
import server, { appIsReady } from '../../../lib/server'
import {
  SkillInput,
  EducationInput,
  ExperienceInput,
} from '../../../lib/__generated__/myskills'
import { SAVE_CV } from '../gql'

let query: any
let mutate: any
let skillsInput: SkillInput[]
let educationInput: EducationInput[]
let experienceInput: ExperienceInput[]
let result

const feature = loadFeature('./test/features/SaveCV.feature')

defineFeature(feature, test => {
  beforeEach(async () => {
    await appIsReady
  })
  afterAll(async () => {
    await server.stop()
  })
  test('Save CV for the first time', ({ given, and, when, then }) => {
    given('I have a bearer token', async () => {
      ;({ query, mutate } = await getConsentedClient(server))
    })
    and('I have this skills input:', (skills: SkillInput[]) => {
      skillsInput = skills
    })
    and('I have this education input:', (education: EducationInput[]) => {
      educationInput = education
    })
    and('I have this experience input:', (experience: ExperienceInput[]) => {
      experienceInput = experience
    })
    when('I send the cv input to the save method', async () => {
      ;({
        data: { saveCV: result },
      } = await mutate({
        mutation: SAVE_CV,
        variables: {
          skills: skillsInput,
          education: educationInput,
          experience: experienceInput,
        },
      }))
    })
    then('I will receive the saved CV back', () => {
      expect(result).toBeTruthy()
    })
    and('I will see the skills input under the skills section', () => {
      const { skills } = result
      expect(skills).toEqual(
        skillsInput.map(x => ({ id: expect.any(String), ...x }))
      )
    })
    and('I will see the education input under the educations section', () => {
      const { education } = result
      expect(education).toEqual(
        educationInput.map(x => ({ id: expect.any(String), ...x }))
      )
    })
    and('I will see the experience input under the experiences section', () => {
      const { experience } = result
      expect(experience).toEqual(
        experienceInput.map(x => ({ id: expect.any(String), ...x }))
      )
    })
  })
})
