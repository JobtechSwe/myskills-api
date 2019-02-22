import { Context } from 'apollo-server-core'

export default async (
  _: any,
  args: any,
  { headers: { token }, mydata }: Context
) => {
  const data = await mydata.getData({ token, area: 'languages' })
  return data
}
