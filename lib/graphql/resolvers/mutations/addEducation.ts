import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  { education }: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
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
