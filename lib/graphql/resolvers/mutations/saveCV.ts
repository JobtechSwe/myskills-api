import { v4 as uuid } from 'uuid'
import {
  MutationResolvers,
  Skill,
  Education,
  Experience,
} from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'

export const saveCV: MutationResolvers.SaveCvResolver = async (
  _,
  { cv: { skills, education, experience } },
  { req, mydata }
) => {
  const token = authorizationToken(req)
  const requests: Promise<any>[] = []

  if (skills && skills.length) {
    requests.push(
      mydata.saveDataList<Skill[]>({
        area: Area.skills,
        data: skills.map(x => ({ id: uuid(), ...x } as Skill)),
        token,
      })
    )
  }

  if (education && education.length) {
    requests.push(
      mydata.saveDataList<Education[]>({
        area: Area.educations,
        data: education.map(x => ({ id: uuid(), ...x } as Education)),
        token,
      })
    )
  }

  if (experience && experience.length) {
    requests.push(
      mydata.saveDataList<Experience[]>({
        area: Area.experiences,
        data: experience.map(x => ({ id: uuid(), ...x } as Experience)),
        token,
      })
    )
  }

  await Promise.all(requests)

  return {}
}

Promise.all([])
