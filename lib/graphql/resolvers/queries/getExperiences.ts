import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<Experience> => {
  const data = await mydata.getData({ token, area: Area.experiences })
  return data
}
