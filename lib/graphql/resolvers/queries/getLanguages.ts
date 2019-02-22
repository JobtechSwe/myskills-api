import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<any> => {
  const data = await mydata.getData({ token, area: Area.languages })
  return data
}
