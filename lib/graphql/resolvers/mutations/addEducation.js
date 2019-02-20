module.exports = async (_, { education }, { headers: { token }, mydata }) => {
  try {
    return mydata.setData({
      area: 'educations',
      data: education,
      token,
    })
  } catch (e) {
    console.log('Add education error: ', e)
  }
}
