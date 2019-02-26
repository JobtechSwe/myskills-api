module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/test/integration/'],
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  projects: ['./jest.api-config.js', './jest.lint-config.js'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
  ],
}
