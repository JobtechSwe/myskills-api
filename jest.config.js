module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/test/integration/'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  }
}
