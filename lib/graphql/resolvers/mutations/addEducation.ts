import { Resolver } from '../../../../lib/server'

interface IAddEducationArgs {
  education: Education
}

export const addEducation: Resolver<IAddEducationArgs> = async (
  _,
  { education },
  { headers: { token }, mydata }
) => {
  try {
    return mydata.saveData({
      area: Area.educations,
      data: education,
      token,
    })
  } catch (e) {
    console.log('Add education error: ', e)
  }
}

export default addEducation
