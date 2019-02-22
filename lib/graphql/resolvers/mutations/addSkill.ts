import { Context } from "apollo-server-core";

export default async (_: any, { skill }: any, { headers: { token }, mydata }: Context) => {
  try {
    return mydata.saveData({
      area: 'skills',
      data: skill,
      token,
    })
  } catch (e) {
    console.log('addSkill error: ', e)
  }
}
