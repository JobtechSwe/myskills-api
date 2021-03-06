import renameKeys from '../renameKeys'

describe('renameKeys', () => {
  test('should rename prop in object', () => {
    const testObj = {
      someProp: 'someValue',
      someOtherProp: 'someOtherValue',
    }

    const result = renameKeys({ someProp: 'newProp' }, testObj)

    expect(result).toEqual({
      newProp: 'someValue',
      someOtherProp: 'someOtherValue',
    })
  })

  test('it should return same object if prop is not found', () => {
    const testObj = {
      someProp: 'someValue',
      someOtherProp: 'someOtherValue',
    }

    const result = renameKeys({ propNotFound: 'newProp' }, testObj)

    expect(result).toEqual({
      someProp: 'someValue',
      someOtherProp: 'someOtherValue',
    })
  })

  test('it should not mutate origin object', () => {
    const testObj = {
      someProp: 'someValue',
      someOtherProp: 'someOtherValue',
    }

    const result = renameKeys({ someProp: 'newProp' }, testObj)

    expect(testObj).toEqual({
      someProp: 'someValue',
      someOtherProp: 'someOtherValue',
    })

    expect(result).toEqual({
      newProp: 'someValue',
      someOtherProp: 'someOtherValue',
    })
  })

  test('it should rename nested properties', () => {
    const testObj = {
      arrayWithSomething: [{ someProp: 'someValue' }],
      someOtherProp: 'someOtherValue',
    }

    const result = renameKeys({ someProp: 'newProp' }, testObj)

    expect(result).toEqual({
      arrayWithSomething: [{ newProp: 'someValue' }],
      someOtherProp: 'someOtherValue',
    })
  })

  test('it should not edit nested array', () => {
    const testObj = {
      arrayWithSomething: ['someValue'],
      someOtherProp: 'someOtherValue',
    }

    const result = renameKeys({}, testObj)

    expect(result).toEqual({
      arrayWithSomething: ['someValue'],
      someOtherProp: 'someOtherValue',
    })
  })
})
