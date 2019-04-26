export const renameKeys = (keysMap: any, obj: any) => {
  return Object.keys(obj).reduce((acc, key) => {
    const renamedObject = {
      [keysMap[key] || key]: obj[key],
    }

    if (typeof obj[key] === 'object') {
      obj[key] = renameKeys(keysMap, obj[key])
    }

    return {
      ...acc,
      ...renamedObject,
    }
  }, {})
}

export default renameKeys
