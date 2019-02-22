import { Context } from 'apollo-server-core'

export default async (
  _: any,
  { experience }: { experience: Experience },
  { headers: { token }, mydata }: Context
) => {
  try {
    return mydata.saveData({
      area: 'experiences',
      data: experience,
      token,
    })
  } catch (e) {
    console.log('addExperience err:', e)
  }
}
