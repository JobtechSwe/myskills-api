module.exports = async (_, { experience }, { headers: { token }, mydata }) => {
  try {
    return mydata.saveData({
      area: 'experiences',
      data: experience,
      token,
    })
  } catch (e) {
    console.log('addExperience err:', e)
  }
}
