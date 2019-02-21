module.exports = async (_, { skill }, { headers: { token }, mydata }) => {
  try {
    return mydata.saveData({
      area: 'skills',
      data: skill,
      token,
    })
  } catch (e) {
    console.log('addSkill error: ', e)
  }
}
