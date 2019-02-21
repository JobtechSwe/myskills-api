export default async (_, _args, { headers: { token }, mydata }) => {
  const data = await mydata.getData({ token, area: 'languages' })
  return data
}
