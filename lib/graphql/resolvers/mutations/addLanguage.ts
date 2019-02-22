import { Context } from 'apollo-server-core'

export default async (
  _: any,
  { language }: any,
  { headers: { token }, mydata }: Context
) => {
  try {
    return mydata.saveData({
      area: 'languages',
      data: language,
      token,
    })
  } catch (e) {
    console.log('addlanguage:', e)
  }
}
