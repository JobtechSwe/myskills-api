module.exports = async (_, _args, { headers: { token }, mydata }) => mydata.getData({ token, area: 'skills' })
