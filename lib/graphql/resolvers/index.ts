import reqdir from 'require-dir'
const Mutation = reqdir('./mutations')
const Query = reqdir('./queries')

export default {
  Mutation,
  Query,
}
