module.exports = async (_, { language }, { headers: { token }, mydata }) => {
  try {
    return mydata.saveData({
      area: 'languages',
      data: language,
      token,
    })
  } catch (e) {
    console.log('addlanguage:', e)
  }
}
