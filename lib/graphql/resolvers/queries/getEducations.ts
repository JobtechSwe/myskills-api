import { Context } from 'apollo-server-core'
import { IApolloServerContext } from '../../../../lib/server'

export default async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context<IApolloServerContext>
): Promise<Education> => {
  const data = await mydata.getData({ token, area: Area.educations })
  return data
}
