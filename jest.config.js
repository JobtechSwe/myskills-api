module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/test/integration/'],
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
}
