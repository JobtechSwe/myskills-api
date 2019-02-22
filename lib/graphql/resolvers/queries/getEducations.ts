import { Context } from 'apollo-server-core'

export default async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context
): Promise<Education> => {
  const data = await mydata.getData({ token, area: 'educations' })
  return data
}
