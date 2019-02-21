module.exports = async (_, _args, { headers: { token }, mydata }) => {
  const data = await mydata.getData({ token, area: 'educations' })
  return data
}
