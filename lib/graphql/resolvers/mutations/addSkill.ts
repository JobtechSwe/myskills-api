import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  { skill }: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<Skill> => {
  try {
    return mydata.saveData({
      area: Area.skills,
      data: skill,
      token,
    })
  } catch (e) {
    console.log('addSkill error: ', e)
  }
}
