import { v4 as uuid } from 'uuid'
import {
  MutationResolvers,
  Skill,
  Education,
  Experience,
  Cv,
  Occupation,
} from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import { ApolloServerContext } from 'lib/typings/context'

function saveCVArea<T>(
  data: T[] | null | undefined,
  mydata: ApolloServerContext['mydata'],
  token: string,
  area: Area
): Promise<T[]> {
  if (data && data.length) {
    const dataList: T[] = data.map((x: T) => ({
      id: uuid(),
      ...x,
    }))

    return mydata.saveDataList<T[]>({
      area,
      data: dataList,
      token,
    })
  }

  return Promise.resolve([])
}

export const saveCV: MutationResolvers['saveCV'] = async (
  _,
  {
    cv: {
      skills: skillsInput,
      educations: educationInput,
      experiences: experienceInput,
      occupation: occupationInput,
    },
  },
  { req, mydata }
): Promise<Cv> => {
  const token = authorizationToken(req)

  try {
    const [skills, educations, experiences, occupation] = await Promise.all([
      saveCVArea<Skill>(skillsInput as Skill[], mydata, token, Area.skills),
      saveCVArea<Education>(
        educationInput as Education[],
        mydata,
        token,
        Area.educations
      ),
      saveCVArea<Experience>(
        experienceInput as Experience[],
        mydata,
        token,
        Area.experiences
      ),
      mydata.saveData<Occupation>({
        area: Area.occupation,
        data: occupationInput as Occupation,
        token,
      }),
    ])

    return {
      skills,
      educations,
      experiences,
      occupation,
    }
  } catch (e) {
    throw new Error(`save CV error: ${e}`)
  }
}
