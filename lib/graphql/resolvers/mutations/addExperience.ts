import { Resolver } from '../../../../lib/server'

interface IAddExperienceArgs {
  experience: Experience
}

export const addExperience: Resolver<IAddExperienceArgs> = async (
  _,
  { experience },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData<Experience[]>({
      area: Area.experiences,
      data: experience,
      token,
    })
  } catch (e) {
    console.log('addExperience err:', e)
  }
}

export default addExperience
