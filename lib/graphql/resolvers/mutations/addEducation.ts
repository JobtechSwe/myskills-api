import { Context } from "apollo-server-core";

export default async (_: any, { education }: any, { headers: { token }, mydata }: Context) => {
  try {
    return mydata.saveData({
      area: 'educations',
      data: education,
      token,
    })
  } catch (e) {
    console.log('Add education error: ', e)
  }
}
