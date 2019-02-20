module.exports = async (_, { experience }, { headers: { token }, mydata }) => {
  try {
    return mydata.setData({
      area: 'experiences',
      data: experience,
      token,
    })
  } catch (e) {
    console.log('addExperience err:', e)
  }
}