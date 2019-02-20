module.exports = async (_, _args, { headers: { token }, mydata }) => {
  console.log('headers', token)
  const data = await mydata.getData({ token, area: 'educations' })
  // console.log('data', data)
  return data
}
