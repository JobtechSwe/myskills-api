import { v4 as uuid } from 'uuid'
import {
  MutationResolvers,
  Skill,
  Education,
  Experience,
  Cv,
  Occupation,
  ImgFile,
} from '../../../__generated__/myskills'
import { Area } from '../../../types'
import authorizationToken from '../../../middleware/authorizationToken'
import { ApolloServerContext } from 'lib/typings/context'
import { resizeImage } from '../../../utils/image'

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
      educations: educationsInput,
      experiences: experiencesInput,
      image,
      occupation: occupationInput,
      personalDescription: personalDescriptionInput,
      skills: skillsInput,
      traits: traitsInput,
    },
  },
  { req, mydata }
): Promise<Cv> => {
  const token = authorizationToken(req)

  const resizedImage =
    image && image.imageString
      ? await resizeImage({ imageString: image.imageString })
      : ''

  try {
    const [
      skills,
      educations,
      experiences,
      traits,
      personalDescription,
      occupation,
    ] = await Promise.all([
      saveCVArea<Skill>(skillsInput as Skill[], mydata, token, Area.skills),
      saveCVArea<Education>(
        educationsInput as Education[],
        mydata,
        token,
        Area.educations
      ),
      saveCVArea<Experience>(
        experiencesInput as Experience[],
        mydata,
        token,
        Area.experiences
      ),
      mydata.saveDataList<string[]>({
        area: Area.traits,
        data: traitsInput || [],
        token,
      }),

      mydata.saveData<string>({
        area: Area.personalDescription,
        data: personalDescriptionInput || '',
        token,
      }),
      mydata.saveData<Occupation>({
        area: Area.occupation,
        data: occupationInput as Occupation,
        token,
      }),
      mydata.saveData<ImgFile>({
        area: Area.image,
        data: { imageString: resizedImage },
        token,
      }),
    ])
    return {
      skills,
      educations,
      experiences,
      traits,
      image: resizedImage,
      personalDescription,
      occupation,
    }
  } catch (e) {
    throw new Error(`save CV error: ${e}`)
  }
}
