import { Context } from 'apollo-server-core'
import { IApolloServerContext, Resolver } from '../../../../lib/server'

export const addExperience = async (
  _: any,
  { experience }: { experience: Experience },
  { headers: { token }, mydata }: Context<IApolloServerContext>
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
