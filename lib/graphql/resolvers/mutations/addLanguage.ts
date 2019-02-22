import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  { language }: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<any> => {
  try {
    return mydata.saveData({
      area: Area.languages,
      data: language,
      token,
    })
  } catch (e) {
    console.log('addlanguage:', e)
  }
}
