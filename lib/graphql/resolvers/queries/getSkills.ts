import { Resolver } from '../../../../lib/server'

const getSkills: Resolver = async (_, args, { headers: { token }, mydata }) =>
  mydata.getData<Skill[]>({ token, area: Area.skills })

export default getSkills
