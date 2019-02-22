import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  { experience }: { experience: Experience },
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<Experience> => {
  try {
    return mydata.saveData({
      area: Area.experiences,
      data: experience,
      token,
    })
  } catch (e) {
    console.log('addExperience err:', e)
  }
}
