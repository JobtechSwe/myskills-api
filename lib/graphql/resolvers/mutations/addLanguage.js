module.exports = async (_, { language }, { headers: { token }, mydata }) => {
  try {
    return mydata.setData({
      area: 'languages',
      data: language,
      token,
    })
  } catch (e) {
    console.log('addlanguage:', e)
  }
}
