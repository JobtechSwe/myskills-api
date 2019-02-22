import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

const getSkills = async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<Skill> => mydata.getData({ token, area: Area.skills })

export default getSkills
