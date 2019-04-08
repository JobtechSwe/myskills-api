import { reduce, curry, assoc, keys } from 'ramda'

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
)

export default renameKeys
