import { Context } from "apollo-server-core";

const getSkills = async (_: any, _args: any, { headers: { token }, mydata }: Context) =>
  mydata.getData({ token, area: 'skills' })

export default getSkills
