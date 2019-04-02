import { v4 as uuid } from 'uuid'
import {
  MutationResolvers,
  Skill,
  Education,
  Experience,
  Cv,
} from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const saveCV: MutationResolvers.SaveCvResolver = async (
  _,
  {
    cv: {
      skills: skillsInput,
      education: educationInput,
      experience: experienceInput,
    },
  },
  { req, mydata }
): Promise<Cv> => {
  const token = authorizationToken(req)
  const requests: Promise<any>[] = []

  try {
    if (skillsInput && skillsInput.length) {
      requests.push(
        mydata.saveDataList<Skill[]>({
          area: Area.skills,
          data: skillsInput.map(x => ({ id: uuid(), ...x } as Skill)),
          token,
        })
      )
    }

    if (educationInput && educationInput.length) {
      requests.push(
        mydata.saveDataList<Education[]>({
          area: Area.educations,
          data: educationInput.map(x => ({ id: uuid(), ...x } as Education)),
          token,
        })
      )
    }

    if (experienceInput && experienceInput.length) {
      requests.push(
        mydata.saveDataList<Experience[]>({
          area: Area.experiences,
          data: experienceInput.map(x => ({ id: uuid(), ...x } as Experience)),
          token,
        })
      )
    }

    const [skills, education, experience] = await Promise.all(requests)
    return {
      skills,
      education,
      experience,
    }
  } catch (e) {
    throw new Error(`save CV error: ${e}`)
  }
}
