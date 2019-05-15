import { defineFeature, loadFeature } from 'jest-cucumber'
import { getConsentedClient } from '../../integration/integrationUtils'
import server, { appIsReady } from '../../../lib/server'
import {
  SkillInput,
  EducationInput,
  ExperienceInput,
} from '../../../lib/__generated__/myskills'
import { SAVE_CV, SKILLS } from '../gql'
import { educations } from '../../../lib/graphql/resolvers/queries'

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
    let educationInput: EducationInput[]
    let experienceInput: ExperienceInput[]
    let result
    given('I have a bearer token', async () => {
      ;({ mutate } = await getConsentedClient(server))
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
          educations: educationInput,
          experiences: experienceInput,
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
      const { education } = result
      const expectedResult = educationInput.map(education => ({
        id: expect.any(String),
        ...education,
      }))
      expect(education).toEqual(expectedResult)
    })
    and('I will see the experience input under the experiences section', () => {
      const { experience } = result
      expect(experience).toEqual(experienceInput)
    })
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
