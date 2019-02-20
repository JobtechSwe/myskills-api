module.exports = async (_, _args, { headers: { token }, mydata }) => {
  const data = await mydata.getData({ token, area: 'experiences' })
  console.log('data', data)
  return data
} 
